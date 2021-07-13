import { RouteComponentProps, useHistory } from 'react-router-dom';

interface times {
  start: string;
  end: string;
}

const CheckURL = (username: string, email: string, history: RouteComponentProps['history']) => {
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
      if (res && res.status === 200) {
        alert('This url is already taken!');
      } else if (res && res.status === 404) {
        UpdateURL(username, email, history);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const UpdateURL = (username: string, email: string, history: RouteComponentProps['history']) => {
  const url = `users/email/${email}`;
  const request = new Request(url, {
    method: 'PATCH',
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
      if (res && res.status === 200) {
        history.push('/confirm');
      } else if (res && res.status === 404) {
        alert('There is no user with the specified email.');
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const UpdateAvail = (email: string, openTimes: times, openDays: string[], history: RouteComponentProps['history']) => {
  const url = `users/email/${email}`;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify({
      availableHours: openTimes,
      availableDays: openDays,
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
        history.push('/dashboard');
      } else if (res && res.status === 404) {
        alert('There is no user with the specified email.');
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export { CheckURL, UpdateURL, UpdateAvail };
