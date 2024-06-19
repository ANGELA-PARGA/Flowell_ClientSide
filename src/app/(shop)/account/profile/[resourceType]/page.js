
import ProfilePersonalInfo from "@/_components/_layout_components/ProfilePersonalInfo";
import ProfileAddressInfo from "@/_components/_layout_components/ProfileAddressInfo";
import ProfilePhoneInfo from "@/_components/_layout_components/ProfilePhoneInfo";
import ProfilePaymentInfo from "@/_components/_layout_components/ProfilePaymentInfo";
import { fetchAllUserInfo } from "@/_utilities/userRequests";

export default async function Profile({params}) {    
    let data;
    try {
        data = await fetchAllUserInfo();
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        return <div>Error loading profile information.</div>;
    }

    const components = {
        personal_inf: ProfilePersonalInfo,
        address_inf: ProfileAddressInfo,
        contact_inf: ProfilePhoneInfo,
        payment_inf: ProfilePaymentInfo,
    };

    const Component = components[params.resourceType];

    if (Component) {
        return <Component userData={data} resourceType={params.resourceType} />;
    } else {
        return <div>Invalid resource type.</div>;
    }
}
