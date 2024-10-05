import ProfilePersonalInfo from "@/components/profile/ProfilePersonalInfo";
import ProfileAddressInfo from "@/components/profile/ProfileAddressInfo";
import ProfilePhoneInfo from "@/components/profile/ProfilePhoneInfo";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import { Suspense } from "react";

export default async function Profile({params}) {    
    const data = await fetchAllUserInfo();
    console.log('user info in Profile component', data)

    const components = {
        personal_inf: ProfilePersonalInfo,
        address_inf: ProfileAddressInfo,
        contact_inf: ProfilePhoneInfo,

    };

    const Component = components[params.resourceType];

    if (Component) {
        return (
            <Suspense>
                <Component userData={data} resourceType={params.resourceType} />
            </Suspense>
        )
    } else {
        return <div>Invalid resource type.</div>;
    }
}
