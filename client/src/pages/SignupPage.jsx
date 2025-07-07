import FormComponent from "@/components/FormComponent";
import Modal from "@/components/ui/Modal";
import { SignInRoute } from "@/helpers/RouteName";
import React from "react";

const SignupPage = () => {
  return (
    <Modal>
      <FormComponent
        className={"pt-18"}
        heading={"Sign Up Into Account"}
        text={"Already have an account?"}
        route={SignInRoute}
        label={"Sign In"}
        isSignUp={true}
        routeEndPoint={"register"}
      />
    </Modal>
  );
};

export default SignupPage;
