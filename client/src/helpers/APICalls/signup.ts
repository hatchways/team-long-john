const initiateSignUp = (userEmail: string, setValidated: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export default initiateSignUp;
