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
import { generateKeyPair } from 'crypto';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [validated, setValidated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const textChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserEmail(event.currentTarget.value.toLowerCase());
  };

  const initiateSignUp = () => {
    // We need to check if there is already an account with the associated userEmail.
    const url = '/users';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    fetch(request)
      .then((res) => {
        if (res && res.status === 200) {
          alert('An user with the given email exists. Please try logging in with this email.');
        } else if (res && res.status === 404) {
          setValidated(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const diffEmail = () => {
    // This event handler is invoked when the user wants to choose a different email.
    setValidated(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {validated ? (
        <AuthenticateMenu signup={true} email={userEmail} diffEmail={diffEmail} />
      ) : (
        <GetStarted signup={true} redirTarget="/login" textChange={textChange} initiater={initiateSignUp} />
      )}
    </Grid>
  );
}
