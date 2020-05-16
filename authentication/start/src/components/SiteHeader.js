import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth0Context } from "../contexts/auth0-context";

export default function SiteHeader() {
  const auth0 = useContext(Auth0Context);

  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        {!auth0.isAuthenticated && (
          <button onClick={() => auth0.login()}>Login</button>
        )}
        {auth0.isAuthenticated && auth0.user && (
          <>
            <button>{auth0.user.name}</button>
            <button onClick={() => auth0.logout()}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
