import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';

import ProfileSettings from './pages/Onboarding/ProfileSettings/ProfileSettings';
import Confirm from './pages/Onboarding/Confirm/Confirm';
import Availability from './pages/Onboarding/Availability/Availability';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Switch>
          <Route exact path="/profile_settings" component={ProfileSettings} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/availability" component={Availability} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
