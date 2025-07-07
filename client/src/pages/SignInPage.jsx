import Modal from "@/components/ui/Modal";
import React from "react";
import FormComponent from "@/components/FormComponent";
import { SignUpRoute } from "@/helpers/RouteName";

const SignInPage = () => {
  return (
    <Modal>
      <FormComponent
        heading={"Login Into Account"}
        text={"Don't have an account?"}
        route={SignUpRoute}
        label={"Sign Up"}
        routeEndPoint={"login"}
      />
    </Modal>
  );
};

export default SignInPage;
