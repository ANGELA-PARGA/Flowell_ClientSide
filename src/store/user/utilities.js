/**
 * Helper function to process the response data from server
 */

export const processUserInfoResponse = (data) => {
    if(data.tableName === 'users'){
        return {
            first_name: data.first_name,
            last_name: data.last_name
        };
    }
    if(data.tableName === 'users_phones'){
        return {
            id: data.id,
            phone: data.phone,
        };
    }
    if(data.tableName === 'users_addresses'){
        return {
            id: data.id,
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: data.zip_code,
        };
    }
};