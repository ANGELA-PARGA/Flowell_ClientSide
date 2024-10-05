import AddAddressForm from "@/components/forms/AddAddressForm"
import AddPhoneForm from "@/components/forms/AddPhoneForm"
import { Suspense } from "react";

export default async function FormToAddPersonalInfo({ params }) {

  const components = {
      address_inf: AddAddressForm,
      contact_inf: AddPhoneForm,
  };

  const Component = components[params.resourceType];

  if (Component) {
      return (
        <Suspense>
          <Component resourceType={params.resourceType} />
        </Suspense>
      );
  } else {
      return <div>Invalid resource type.</div>;
  }
}


