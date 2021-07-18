import isDev from '../isDev';

const initiateLogIn = (userEmail: string, setValidated: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // We need to check if there is an account with the associated userEmail.
  const url = isDev() ? '/users' : `${process.env.PROD_URL}/users`;
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
        alert('No user with the given email exists. Please create an account if you wish to make one with this email.');
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export default initiateLogIn;
