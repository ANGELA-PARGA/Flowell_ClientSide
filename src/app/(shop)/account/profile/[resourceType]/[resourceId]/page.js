import UpdateAddressInfo from '@/components/forms/UpdateAddressInfo';
import UpdateProfileInfo from '@/components/forms/UpdateProfileInfo';
import UpdatePhoneInfo from '@/components/forms/UpdatePhoneInfo';
import UpdateCreditInfo from '@/components/forms/UpdateCreditInfo';
import { fetchAllUserInfo } from '@/lib/fetchingUserInfo';

export default async function FormToUpdatePersonalInfo({ params }) {
    const data = await fetchAllUserInfo();
    console.log('user info in FormToUpdatePersonalInfo component', data)

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

