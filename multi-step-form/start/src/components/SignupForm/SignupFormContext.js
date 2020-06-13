import React, { createContext, useContext, useState } from "react";

export const SignupFormContext = createContext();
export const useSignupForm = () => useContext(SignupFormContext);

export const SignupFormProvider = ({ children }) => {
  //store state here
  const [profile, setProfile] = useState({});
  const [social, setSolical] = useState({});

  return (
    <SignupFormContext.Provider
      value={{ profile, setProfile, social, setSolical }}
    >
      {children}
    </SignupFormContext.Provider>
  );
};
