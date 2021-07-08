import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import GetStarted from '../helper/GetStarted/GetStarted';
import AuthenticateMenu from '../helper/AuthenticateMenu/AuthenticateMenu';
import React from 'react';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [validated, setValidated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const textChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserEmail(event.currentTarget.value);
  };

  const initiateLogIn = () => {
    // We need to check if there is an account with the associated userEmail.
    const url = `/users/email`;
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    fetch(request)
      .then((res) => {
        if (res && res.status === 200) {
          setValidated(true);
        } else if (res && res.status === 404) {
          alert(
            'No user with the given email exists. Please create an account if you wish to make one with this email.',
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const googleAuth = () => {
    // Authentication with google should be done here.
  };

  const diffEmail = () => {
    // This event handler is invoked when the user wants to choose a different email.
    setValidated(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {validated ? (
        <AuthenticateMenu signup={false} email={userEmail} google={googleAuth} diffEmail={diffEmail} />
      ) : (
        <GetStarted signup={false} redirTarget="/signup" textChange={textChange} initiater={initiateLogIn} />
      )}
    </Grid>
  );
}
