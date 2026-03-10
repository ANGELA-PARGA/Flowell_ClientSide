import { createSlice } from '@reduxjs/toolkit';
import userInitialState from '@/store/user/state';
import { fetchUserInfo, updateUserInfo, addUserInfo, deleteUserInfo } from '@/store/user/thunks';
import { NAME_RESOURCE, PHONE_RESOURCE, ADDRESS_RESOURCE } from '@/const';

const userSlice = createSlice({ 
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.phone = action.payload.phones;
            state.address = action.payload.addresses;
            state.lastUpdated = Date.now(); 
        },
        clearUser: (state) => {
            console.log('[userSlice] clearUser - Clearing user (session expired)');
            state.id = null;
            state.first_name = null;
            state.last_name = null;
            state.email = null;
            state.phone = null;
            state.address = null;
        },
        restoreUserSnapshot: (state, action) => {
            console.log('[userSlice] restoreUserSnapshot - Restoring state from snapshot');
            const snapshot = action.payload;
            state.id = snapshot.id;
            state.first_name = snapshot.first_name;
            state.last_name = snapshot.last_name;
            state.email = snapshot.email;
            state.phone = snapshot.phone;
            state.address = snapshot.address;
            state.lastUpdated = Date.now();
        },
        updateUserInfoLocally: (state, action) => {
            const { resourceId, resourceType, data } = action.payload;
            console.log('[userSlice] updateUserInfoLocally:', { resourceType, resourceId, data });
            
            if (resourceType === PHONE_RESOURCE) {
                const index = state.phone.findIndex(phone => phone.id === resourceId);
                if (index !== -1) {
                    state.phone[index] = { ...state.phone[index], ...data };
                    console.log('[userSlice] updateUserInfoLocally - Phone updated');
                }
            } else if (resourceType === ADDRESS_RESOURCE) {
                const index = state.address.findIndex(address => address.id === resourceId);
                if (index !== -1) {
                    state.address[index] = { ...state.address[index], ...data };
                    console.log('[userSlice] updateUserInfoLocally - Address updated');
                }
            } else if (resourceType === NAME_RESOURCE) {
                state.first_name = data.first_name || state.first_name;
                state.last_name = data.last_name || state.last_name;
                console.log('[userSlice] updateUserInfoLocally - Personal info updated');
            }

            state.lastUpdated = Date.now();
        },
        
        addUserInfoLocally: (state, action) => {
            const { resourceType, data } = action.payload;
            console.log('[userSlice] addUserInfoLocally:', { resourceType, data });
            
            if (resourceType === PHONE_RESOURCE) {
                if(!state.phone){
                    state.phone = [];
                }
                state.phone.push(data);
                console.log('[userSlice] addUserInfoLocally - Phone added, tempId:');
            } else if (resourceType === ADDRESS_RESOURCE) {
                if(!state.address){
                    state.address = [];
                }
                state.address.push(data);
                console.log('[userSlice] addUserInfoLocally - Address added, tempId:');
            }

            state.lastUpdated = Date.now();
        },
        
        deleteUserInfoLocally: (state, action) => {
            const { resourceId, resourceType } = action.payload;
            console.log('[userSlice] deleteUserInfoLocally:', { resourceType, resourceId });
            
            if (resourceType === PHONE_RESOURCE) {
                state.phone = state.phone.filter(phone => phone.id !== resourceId);
                console.log('[userSlice] deleteUserInfoLocally - Phone deleted');
            } else if (resourceType === ADDRESS_RESOURCE) {
                state.address = state.address.filter(address => address.id !== resourceId);
                console.log('[userSlice] deleteUserInfoLocally - Address deleted');
            }
            
            state.lastUpdated = Date.now();
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserInfo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.phone = action.payload.phones;
            state.address = action.payload.addresses;
            state.isLoading = false;
            state.lastUpdated = Date.now();
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(addUserInfo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addUserInfo.fulfilled, (state, action) => {
            const { data, tempId } = action.payload;
            const { resourceType } = action.meta.arg;
            
            if (resourceType === NAME_RESOURCE) {
                state.first_name = data.first_name || state.first_name;
                state.last_name = data.last_name || state.last_name;
            } else if (resourceType === PHONE_RESOURCE) {
                const index = state.phone.findIndex(phone => phone.id === tempId);
                if (index !== -1) {
                    state.phone[index] = data;
                }
            } else if (resourceType === ADDRESS_RESOURCE) {
                const index = state.address.findIndex(address => address.id === tempId);
                if (index !== -1) {
                    state.address[index] = data;
                }
            }            
            state.isLoading = false;
            state.lastUpdated = Date.now();
        })
        .addCase(addUserInfo.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(updateUserInfo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserInfo.fulfilled, (state, action) => {
            const data = action.payload;
            const { resourceType, resourceId } = action.meta.arg;
            
            if (resourceType === NAME_RESOURCE) {
                state.first_name = data.first_name || state.first_name;
                state.last_name = data.last_name || state.last_name;
            } else if (resourceType === PHONE_RESOURCE) {
                const index = state.phone.findIndex(phone => phone.id === resourceId);
                if (index !== -1) {
                    state.phone[index] = { ...state.phone[index], ...data };
                }
            } else if (resourceType === ADDRESS_RESOURCE) {
                const index = state.address.findIndex(address => address.id === resourceId);
                if (index !== -1) {
                    state.address[index] = { ...state.address[index], ...data };
                }
            }            
            state.isLoading = false;
            state.lastUpdated = Date.now();
        })
        .addCase(updateUserInfo.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(deleteUserInfo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteUserInfo.fulfilled, (state, action) => {
            const { resourceType, resourceId } = action.payload;

            if (resourceType === PHONE_RESOURCE) {
                state.phone = state.phone.filter(phone => phone.id !== resourceId);
            } else if (resourceType === ADDRESS_RESOURCE) {
                state.address = state.address.filter(address => address.id !== resourceId);
            }
            
            state.isLoading = false;
            state.lastUpdated = Date.now();
        })
        .addCase(deleteUserInfo.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
})

export const {
    setUser,
    clearUser,
    restoreUserSnapshot,
    hydrateUser,
    updateUserInfoLocally,
    addUserInfoLocally,
    deleteUserInfoLocally,
} = userSlice.actions;

export default userSlice.reducer;