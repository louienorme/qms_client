import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

import './App.css';
import AdminLogin from './pages/AdminLogin/AdminLogin';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* Auth */}
          <Redirect exact from='/' to='/login' />
          <Route exact path='/login' component={AdminLogin} />
          <Route />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
