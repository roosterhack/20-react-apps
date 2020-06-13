import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export const SocialForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    history.push("/review");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Tell us your soical connections</h2>

      <input
        type="text"
        name="twitter"
        placeholder="Whats your twitter?"
        ref={register({ required: true })}
      />
      <p>{errors.twitter && "Twitter is required"}</p>

      <input
        type="text"
        name="facebook"
        placeholder="Whatos your facebook?"
        ref={register({
          required: true,
        })}
      />

      <p>{errors.facebook && "Facebook is required"}</p>

      <input type="submit" value="Next" />
    </form>
  );
};
