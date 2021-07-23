const initiateLogIn = (
  userEmail: string,
  setValidated: React.Dispatch<React.SetStateAction<boolean>>,
  updateSnackBarMessage: (message: string) => void,
): void => {
  // We need to check if there is an account with the associated userEmail.
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
        setValidated(true);
      } else if (res && res.status === 404) {
        updateSnackBarMessage(
          'No user with the given email exists. Please create an account if you wish to make one with this email.',
        );
      }
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

export default initiateLogIn;
