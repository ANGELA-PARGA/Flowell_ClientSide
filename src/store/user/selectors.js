import { createSelector } from '@reduxjs/toolkit';

const selectUser = (state) => state.user;

export const selectUserId = createSelector(
    [selectUser],
    (user) => user.id
);

export const selectUserFullName = createSelector(
    [selectUser],
    (user) => `${user.first_name} ${user.last_name}`.trim()
);

export const selectUserFirstName = createSelector(
    [selectUser],
    (user) => user.first_name
);

export const selectUserLastName = createSelector(
    [selectUser],
    (user) => user.last_name
);

export const selectUserEmail = createSelector(
    [selectUser],
    (user) => user.email
);

export const selectUserAddresses = createSelector(
    [selectUser],
    (user) => user.address || []
);

export const selectUserPhones = createSelector(
    [selectUser],
    (user) => user.phone || []
);

export const selectUserIsLoading = createSelector(
    [selectUser],
    (user) => user.isLoading
);

export const selectUserError = createSelector(
    [selectUser],
    (user) => user.error
);

export const selectUserLastUpdated = createSelector(
    [selectUser],
    (user) => user.lastUpdated
);

export const selectAddressById = (addressId) => createSelector(
    [selectUserAddresses],
    (addresses) => addresses.find(addr => addr.id === addressId)
);


export const selectPhoneById = (phoneId) => createSelector(
    [selectUserPhones],
    (phones) => phones.find(phone => phone.id === phoneId)
);
