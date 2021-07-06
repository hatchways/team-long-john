import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import React from 'react';
import GetStarted from '../helper/GetStarted/GetStarted';
import AuthenticateMenu from '../helper/AuthenticateMenu/AuthenticateMenu';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [validated, setValidated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
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

  const initiateSignUp = () => {
    // We need to check if there is already an account with the associated userEmail.
    // If there is none, then turn validated to true.
    // For now, it will always be changed to true for test purposes.
    setValidated(true);
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
        <AuthenticateMenu signup={true} email={userEmail} google={googleAuth} diffEmail={diffEmail} />
      ) : (
        <GetStarted signup={true} redirTarget="/login" textChange={textChange} initiater={initiateSignUp} />
      )}
    </Grid>
  );
}
