import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';

import ProfileSettings from './pages/Onboarding/ProfileSettings/ProfileSettings';
import Confirm from './pages/Onboarding/Confirm/Confirm';
import Availability from './pages/Onboarding/Availability/Availability';
import Completion from './pages/Scheduler/Completion/Completion';

import './App.css';
import Scheduler from './pages/Scheduler/Scheduler';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <SnackBarProvider>
          <AuthProvider> */}
        <Switch>
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} /> */}
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/scheduler/:username/:duration" component={Scheduler} />\
          <Route exact path="/completion" component={Completion} />
          <Route exact path="/profile_settings" component={ProfileSettings} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/availability" component={Availability} />
          <Route path="*">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
        {/* </AuthProvider>
        </SnackBarProvider> */}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
