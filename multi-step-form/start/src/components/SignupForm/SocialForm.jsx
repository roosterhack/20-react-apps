import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSignupForm } from './SignupFormContext.js';
import { Animator } from './Animator.js';

export const SocialForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    setSocial(data);
    console.log(data);
    history.push('/review');
  };
  const { social, setSocial } = useSignupForm();

  return (
    <Animator>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Tell us your soical connections</h2>

        <input
          type='text'
          name='twitter'
          defaultValue={social.twitter}
          placeholder='What is your twitter?'
          ref={register({ required: true })}
        />
        <p>{errors.twitter && 'Twitter is required'}</p>

        <input
          type='text'
          name='facebook'
          defaultValue={social.facebook}
          placeholder='What is your facebook?'
          ref={register({
            required: true,
          })}
        />

        <p>{errors.facebook && 'Facebook is required'}</p>

        <input type='submit' value='Next' />
      </form>
    </Animator>
  );
};
