import React from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import { About } from "../pages/About";
import { Features } from "../pages/Features";
import { Home } from "../pages/Home";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/features">
        <Features />
      </Route>
      <Route path="/" exact={true}>
        <Home />
      </Route>
    </Switch>
  );
};
