import UpdateAddressInfo from '@/_components/_layout_components/UpdateAddressInfo';
import UpdateProfileInfo from '@/_components/_layout_components/UpdateProfileInfo';
import UpdatePhoneInfo from '@/_components/_layout_components/UpdatePhoneInfo';
import UpdateCreditInfo from '@/_components/_layout_components/UpdateCreditInfo';

import { fetchAllUserInfo } from '@/_utilities/userRequests';

export default async function FormToUpdatePersonalInfo({params}) {
    const data = await fetchAllUserInfo()   

    if(params.resourceType === 'personal_inf') {
        const firstName = data.user.first_name;
        const lastName = data.user.last_name;
        return (
            <>
            <UpdateProfileInfo resourceType={params.resourceType} resourceId={params.resourceId} name={{firstName, lastName}}/>
            </>
        );
    }

    if(params.resourceType === 'address_inf') {
        const addressToUpdate = data.user.addresses.filter((address) => address.addressID === parseInt(params.resourceId))
        return (
            <>
            <UpdateAddressInfo resourceType={params.resourceType} resourceId={params.resourceId} address={addressToUpdate}/>
            </>
        );
    }

    if(params.resourceType === 'contact_inf') {
        const phoneToUpdate = data.user.phones.filter((phone) => phone.phoneID === parseInt(params.resourceId))
        return (
            <>
            <UpdatePhoneInfo resourceType={params.resourceType} resourceId={params.resourceId} phone={phoneToUpdate}/>
            </>
        );
    }

    if(params.resourceType === 'payment_inf') {
        const ccardToUpdate = data.user.credit_cards.filter((creditc) => creditc.creditcardID === parseInt(params.resourceId))
        return (
            <>
            <UpdateCreditInfo resourceType={params.resourceType} resourceId={params.resourceId} creditCard={ccardToUpdate}/>
            </>
        );
    }
            
}