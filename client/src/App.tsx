import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

import ProfileSettings from './pages/Onboarding/ProfileSettings';
import Availability from './pages/Onboarding/Availability';

import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <SnackBarProvider>
          <AuthProvider> */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/profile_settings" component={ProfileSettings} />
          <Route exact path="/availability" component={Availability} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
        {/* </AuthProvider>
        </SnackBarProvider> */}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
