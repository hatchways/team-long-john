import { RouteComponentProps } from 'react-router-dom';

type simpleFunc = () => void;

interface times {
  start: string;
  end: string;
}

const CheckURL = (
  username: string,
  timeZone: string,
  email: string,
  history: RouteComponentProps['history'],
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = '/users/username';
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) updateSnackBarMessage('This url is already taken!');
      else if (res && res.status === 404) UpdateURL(username, timeZone, email, history, updateSnackBarMessage);
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const UpdateURL = (
  username: string,
  timeZone: string,
  email: string,
  history: RouteComponentProps['history'],
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `users/email/${email}`;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify({
      username: username,
      timezone: timeZone,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) history.push('/confirm');
      else if (res && res.status === 404) updateSnackBarMessage('There is no user with the specified email.');
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const UpdateAvail = (
  email: string,
  openTimes: times,
  openDays: string[],
  logout: simpleFunc,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `users/email/${email}`;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify({
      availableHours: openTimes,
      availableDays: openDays.filter(Boolean),
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
        updateSnackBarMessage('Your account has successfully been created. Please login to use your account.');
        logout();
      } else if (res && res.status === 404) updateSnackBarMessage('There is no user with the specified email.');
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

export { CheckURL, UpdateURL, UpdateAvail };
