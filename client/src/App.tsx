import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Completion from './pages/Scheduler/Completion/Completion';
import Scheduler from './pages/Scheduler/Scheduler';

import ProfileSettings from './pages/Onboarding/ProfileSettings/ProfileSettings';
import Confirm from './pages/Onboarding/Confirm/Confirm';
import Availability from './pages/Onboarding/Availability/Availability';
import AuthSetUp from './pages/helper/AuthSetUp';
import Upgrade from './pages/Upgrade/Upgrade';
import Setting from './pages/Setting/Setting';
import Success from './pages/Success/Success';

import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';
import SchedulerWrapper from './pages/Scheduler/SchedulerWrapper';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <Switch>
            <Route exact path="/shared/:username/:meetingId" component={SchedulerWrapper} />
            <Route exact path="/scheduler" component={Scheduler} />
            <Route exact path="/completion/:appointID" component={Completion} />
            <AuthProvider>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/AuthSetup" component={AuthSetUp} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/initialSettings" component={ProfileSettings} />
              <Route exact path="/confirm" component={Confirm} />
              <Route exact path="/availability" component={Availability} />
              <Route exact path="/upgrade" component={Upgrade} />
              <Route exact path="/userSetting" component={Setting} />
              <Route exact path="/success" component={Success} />
            </AuthProvider>
          </Switch>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
