
import ProfilePersonalInfo from "@/_components/_layout_components/ProfilePersonalInfo";
import ProfileAddressInfo from "@/_components/_layout_components/ProfileAddressInfo";
import ProfilePhoneInfo from "@/_components/_layout_components/ProfilePhoneInfo";
import ProfilePaymentInfo from "@/_components/_layout_components/ProfilePaymentInfo";
import { fetchAllUserInfo } from "@/_utilities/userRequests";

export default async function Profile({params}) {    
    const data = await fetchAllUserInfo()
    console.log(data)

    if(params.resourceType === 'personal_inf'){
        return (
            <>
            <ProfilePersonalInfo userData={data} resourceType={params.resourceType}/>
            </> 
        );

    }

    if(params.resourceType === 'address_inf'){
        return (
            <>
            <ProfileAddressInfo userData={data} resourceType={params.resourceType}/>
            </> 
        );

    }

    if(params.resourceType === 'contact_inf'){
        return (
            <>
            <ProfilePhoneInfo userData={data} resourceType={params.resourceType}/>
            </> 
        );

    }

    if(params.resourceType === 'payment_inf'){
        return (
            <>
            <ProfilePaymentInfo userData={data} resourceType={params.resourceType}/>
            </> 
        );

    }
}
