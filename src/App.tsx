import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

import './App.css';
import { AdminLogin, Dashboard } from './pages';
import { ProtectedRoute } from './routes';

// Axios Interceptors
import { setupInterceptorsTo } from './axios/interceptors';
import axios from 'axios';

setupInterceptorsTo(axios);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* Auth */}
          <Redirect exact from='/' to='/login' />
          <Route exact path='/login' component={AdminLogin} />
          
          {/* Admin Dashboard */}
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
