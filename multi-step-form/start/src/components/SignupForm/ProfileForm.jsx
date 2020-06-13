import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSignupForm } from "./SignupFormContext";

export const ProfileForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    setProfile(data);
    history.push("/social");
  };
  const { profile, setProfile } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Tell us about yourslef</h2>

      <input
        type="text"
        name="name"
        placeholder="Whatos your name?"
        defaultValue={profile.name}
        ref={register({ required: true })}
      />
      <p>{errors.name && "Name is required"}</p>

      <input
        type="email"
        name="email"
        placeholder="Whatos your email?"
        defaultValue={profile.email}
        ref={register({
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />

      <p>{errors.email && "A valid email is required"}</p>

      <input type="submit" value="Next" />
    </form>
  );
};
