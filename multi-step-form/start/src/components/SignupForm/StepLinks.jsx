import React from "react";
import { NavLink } from "react-router-dom";

export const StepLinks = () => {
  return (
    <div className="step-links">
      <NavLink to="/" exact>
        Profile
      </NavLink>
      <NavLink to="/social">Social</NavLink>
      <NavLink to="/review">Review</NavLink>
    </div>
  );
};
