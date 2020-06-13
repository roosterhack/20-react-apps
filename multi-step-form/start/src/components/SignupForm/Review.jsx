import React from 'react';
import { useSignupForm } from './SignupFormContext';
import { Animator } from './Animator';

export const Review = () => {
  const { profile, social } = useSignupForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...profile, ...social });
  };

  return (
    <Animator>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Name</strong>: {profile.name}
        </p>
        <p>
          <strong>Email</strong>: {profile.email}
        </p>
        <p>
          <strong>Twitter</strong>: {social.twitter}
        </p>
        <p>
          <strong>Facebook</strong>: {social.facebook}
        </p>
        <input type='submit' value='Submit All Info' />
      </form>
    </Animator>
  );
};
