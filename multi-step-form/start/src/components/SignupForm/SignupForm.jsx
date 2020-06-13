import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProfileForm } from "./ProfileForm";
import { SocialForm } from "./SocialForm";
import { Review } from "./Review";
import { StepLinks } from "./StepLinks";
import { SignupFormProvider } from "./SignupFormContext";

export const SignupForm = () => {
  return (
    <SignupFormProvider>
      <div className="signup-form">
        <StepLinks />
        <Switch>
          <Route path="/" exact component={ProfileForm} />
          <Route path="/social" exact component={SocialForm} />
          <Route path="/review" exact component={Review} />
        </Switch>
      </div>
    </SignupFormProvider>
  );
};
