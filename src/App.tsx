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

          {/** Window */}
          <ProtectedRoute exact path='/window' component={Window} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
