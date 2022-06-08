import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

import './App.css';
import { 
  AdminLogin,
  Archives, 
  Dashboard, 
  Management, 
  QueueCreation,
  Flashboard,
  Station,
  Window 
} from './pages';
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

          <Route 
              path='/privacy-policy' 
              component={() => {
                window.open(
                  'https://docs.google.com/document/d/1lP1PcdQ2ZQF2n0usWSXZpVrORnvReOrn/edit?usp=sharing&ouid=109011932954638739441&rtpof=true&sd=true'
                  );
                window.history.back();
                return null;
              }}
          />

          <Route 
              path='/terms-and-conditions'
              component={() => {
                window.open(
                  'https://docs.google.com/document/d/1fCVLokJEA6TD5atGjGxYdkSynF0mr0Xd/edit?usp=sharing&ouid=109011932954638739441&rtpof=true&sd=true'
                );
                window.history.back();
                return null;
              }}
          />
          
          {/* Admin Dashboard */}
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />

          {/* Admin Management */}
          <ProtectedRoute exact path='/management' component={Management} />

          {/* Admin Archives */}
          <ProtectedRoute exact path='/archives' component={Archives} />

            {/* Queue Configuration */}
            <ProtectedRoute exact path='/management/queue-creation' component={QueueCreation} />

          {/** Flashboard */}
          <ProtectedRoute exact path='/flashboard' component={Flashboard} />

          {/** Station */}
          <ProtectedRoute exact path='/station' component={Station} />

          {/** Window */}
          <ProtectedRoute exact path='/window' component={Window} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
