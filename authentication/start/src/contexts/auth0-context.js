import React, { createContext, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
export const Auth0Context = createContext();

export const Auth0Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAUth0 = async () => {
      try {
        const auth0 = await createAuth0Client({
          domain: "roosterhack.eu.auth0.com",
          client_id: "t1AM5EiirRIlP1kvlul3ErPbOe1BhYPY",
          redirect_uri: window.location.origin,
        });

        setAuth0Client(auth0);

        //handle redirect when user comes back
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          try {
            await auth0.handleRedirectCallback();
          } catch (err) {
            console.log(err);
          }
          window.location.replace(window.location.pathname);
        }

        // is a user authenticated
        const isAuthenticated = await auth0.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        //go grab the user
        if (isAuthenticated) {
          const user = await auth0.getUser();
          setUser(user);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    initAUth0();
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: (...p) => auth0Client.loginWithRedirect(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
