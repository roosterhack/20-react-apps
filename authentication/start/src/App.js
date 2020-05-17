import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';
import { useAuth0 } from './contexts/auth0-context';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
  const auth0 = useAuth0;

  const getUserData = async () => {
    const token = await auth0.getToken();
    console.group(token);

    // call your own api to pass the token to your BE then check
    // const res = await fetch('http://myApiUrl.com/api/api',{headers: {Authorization: `Bearer ${token}`}})
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Router>
      <div className='app'>
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <PrivateRoute path='/dashboard'>
            <Dashboard />
          </PrivateRoute>

          <Route path='/' exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
