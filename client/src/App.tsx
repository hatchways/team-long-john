import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfileSettings from './pages/Onboarding/ProfileSettings/ProfileSettings';
import Confirm from './pages/Onboarding/Confirm/Confirm';
import Availability from './pages/Onboarding/Availability/Availability';
import AuthSetUp from './pages/helper/AuthSetUp';
import Upgrade from './pages/Upgrade/Upgrade';
import Checkout from './pages/Checkout/Checkout';

import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/AuthSetup" component={AuthSetUp} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile_settings" component={ProfileSettings} />
              <Route exact path="/confirm" component={Confirm} />
              <Route exact path="/availability" component={Availability} />
              <Route exact path="/upgrade" component={Upgrade} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
