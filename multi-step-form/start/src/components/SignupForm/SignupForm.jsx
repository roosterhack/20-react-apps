import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ProfileForm } from './ProfileForm';
import { SocialForm } from './SocialForm';
import { Review } from './Review';
import { StepLinks } from './StepLinks';
import { SignupFormProvider } from './SignupFormContext';
import { AnimatePresence } from 'framer-motion';

export const SignupForm = () => {
  const location = useLocation();
  return (
    <SignupFormProvider>
      <div className='signup-form'>
        <StepLinks />
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route path='/' exact component={ProfileForm} />
            <Route path='/social' exact component={SocialForm} />
            <Route path='/review' exact component={Review} />
          </Switch>
        </AnimatePresence>
      </div>
    </SignupFormProvider>
  );
};
