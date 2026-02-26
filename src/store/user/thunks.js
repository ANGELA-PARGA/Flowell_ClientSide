import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUserInfo,  } from "@/lib/fetchingUserInfo";
import { 
    updatePersonalInfo, 
    addNewPersonalInfo, 
    deletePersonalInfo, 
} from "@/actions/userRequests";
import { processUserInfoResponse } from "./utilities";
import { 
    updateUserInfoLocally, 
    addUserInfoLocally, 
    deleteUserInfoLocally,
    clearUser,
    restoreUserSnapshot 
} from './slice';

/**
 * Fetches all user information from the server
 */
export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetchAllUserInfo();

            if(response?.expired) {
                console.log('[userThunk] fetchUserInfo - Session expired, clearing user');
                dispatch(clearUser());
                return rejectWithValue('Session expired');  
            }
            return response?.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Updates personal information of the user
 * Supports automatic cancellation via AbortController
 * Implements optimistic updates for instant UI feedback
 */
export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async ({ data, resourceType, resourceId }, { rejectWithValue, dispatch, getState }) => {
        console.log('[userThunk] updateUserInfo - Entry:', { resourceType, resourceId, data });

        const snapshot = getState().user;
        console.log('[userThunk] updateUserInfo - State snapshot captured');

        console.log('[userThunk] updateUserInfo - Dispatching optimistic update');
        dispatch(updateUserInfoLocally({ 
            resourceId, 
            resourceType, 
            data 
        }));

        try {
            const response = await updatePersonalInfo(data, resourceType, resourceId);
            
            if (response?.expired) {
                console.log('[userThunk] updateUserInfo - Session expired, clearing user');
                dispatch(clearUser());
                return rejectWithValue('Session expired');
            }
            
            console.log('[userThunk] updateUserInfo - Response received:', response?.data.user_info);
            return processUserInfoResponse(response?.data.user_info);
        } catch (error) {
            console.error('[userThunk] updateUserInfo - Error, restoring snapshot:', error.message);
            dispatch(restoreUserSnapshot(snapshot));
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Adds new personal information for the user
 * Supports automatic cancellation via AbortController
 * Implements optimistic updates for instant UI feedback
 */
export const addUserInfo = createAsyncThunk(
    'user/addUserInfo',
    async ({ data, resourceType }, { rejectWithValue, dispatch, getState }) => {
        console.log('[userThunk] addUserInfo - Entry:', { resourceType, data });

        const snapshot = getState().user;
        console.log('[userThunk] addUserInfo - State snapshot captured');

        const tempId = Date.now();
        const optimisticData = { ...data, id: tempId };
        console.log('[userThunk] addUserInfo - Dispatching optimistic add with tempId:', tempId);
        
        dispatch(addUserInfoLocally({ 
            resourceType, 
            data: optimisticData 
        }));

        try {
            const response = await addNewPersonalInfo(data, resourceType);
            
            if (response?.expired) {
                console.log('[userThunk] addUserInfo - Session expired, clearing user');
                dispatch(clearUser());
                return rejectWithValue('Session expired');
            }
            
            console.log('[userThunk] addUserInfo - Response received:', response?.data.user_info);
            const processedData = processUserInfoResponse(response?.data.user_info);
            return {data: processedData, tempId };
        } catch (error) {
            console.error('[userThunk] addUserInfo - Error, restoring snapshot:', error.message);
            dispatch(restoreUserSnapshot(snapshot));
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Deletes personal information of the user
 * Supports automatic cancellation via AbortController
 * Implements optimistic updates for instant UI feedback
 */
export const deleteUserInfo = createAsyncThunk(
    'user/deleteUserInfo',
    async ({ resourceType, resourceId }, { rejectWithValue, dispatch, getState }) => {
        console.log('[userThunk] deleteUserInfo - Entry:', { resourceType, resourceId });

        const snapshot = getState().user;
        console.log('[userThunk] deleteUserInfo - State snapshot captured');

        console.log('[userThunk] deleteUserInfo - Dispatching optimistic deletion');
        dispatch(deleteUserInfoLocally({ 
            resourceId, 
            resourceType 
        }));

        try {
            const response = await deletePersonalInfo(resourceType, resourceId);
            
            if (response?.expired) {
                console.log('[userThunk] deleteUserInfo - Session expired, clearing user');
                dispatch(clearUser());
                return rejectWithValue('Session expired');
            }
            console.log('[userThunk] deleteUserInfo - Success');
            return { resourceType, resourceId };
        } catch (error) {
            console.error('[userThunk] deleteUserInfo - Error, restoring snapshot:', error.message);
            dispatch(restoreUserSnapshot(snapshot));
            return rejectWithValue(error.message);
        }
    }
);
