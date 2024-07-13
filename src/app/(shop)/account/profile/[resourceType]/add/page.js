import AddAddressForm from "@/components/forms/AddAddressForm"
import AddPhoneForm from "@/components/forms/AddPhoneForm"
import AddPaymentForm from "@/components/forms/AddPaymentForm"
import { Suspense } from "react";

export default async function FormToAddPersonalInfo({ params }) {
  console.log('user info in FormToAddPersonalInfo component')

  const components = {
      address_inf: AddAddressForm,
      contact_inf: AddPhoneForm,
      payment_inf: AddPaymentForm,
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


