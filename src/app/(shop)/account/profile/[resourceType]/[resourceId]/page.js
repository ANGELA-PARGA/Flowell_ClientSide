import UpdateAddressInfo from '@/_components/_layout_components/information_forms/UpdateAddressInfo';
import UpdateProfileInfo from '@/_components/_layout_components/information_forms/UpdateProfileInfo';
import UpdatePhoneInfo from '@/_components/_layout_components/information_forms/UpdatePhoneInfo';
import UpdateCreditInfo from '@/_components/_layout_components/information_forms/UpdateCreditInfo';

import { fetchAllUserInfo } from '@/_utilities/userRequests';

export default async function FormToUpdatePersonalInfo({ params }) {
    let data;
    try {
        data = await fetchAllUserInfo();
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        return <div>Error loading profile information.</div>;
    }

    const components = {
        personal_inf: UpdateProfileInfo,
        address_inf: UpdateAddressInfo,
        contact_inf: UpdatePhoneInfo,
        payment_inf: UpdateCreditInfo,
    };

    const propsForComponent = {
        personal_inf: {
            resourceType: params.resourceType,
            resourceId: params.resourceId,
            name: {
                firstName: data.user.first_name,
                lastName: data.user.last_name,
            },
        },
        address_inf: {
            resourceType: params.resourceType,
            resourceId: params.resourceId,
            address: (data.user.addresses || []).filter(
                (address) => address.addressID === parseInt(params.resourceId)
            ),
        },
        contact_inf: {
            resourceType: params.resourceType,
            resourceId: params.resourceId,
            phone: (data.user.phones || []).filter(
                (phone) => phone.phoneID === parseInt(params.resourceId)
            ),
        },
        payment_inf: {
            resourceType: params.resourceType,
            resourceId: params.resourceId,
            creditCard: (data.user.credit_cards || []).filter(
                (creditc) => creditc.creditcardID === parseInt(params.resourceId)
            ),
        },
    };

    const Component = components[params.resourceType];

    if (Component) {
        return <Component {...propsForComponent[params.resourceType]} />;
    } else {
        return <div>Invalid resource type.</div>;
    }
}

