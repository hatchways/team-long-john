import { hostInfoProp } from '../../interface/SchedulerProps';

const getHostInfo = (username: string, setter: React.Dispatch<React.SetStateAction<hostInfoProp>>): void => {
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
        return res.json();
      } else if (res && res.status === 404) {
        alert('There is no user with the specified username.');
      }
    })
    .then((data) => {
      const user = data.success.user;
      setter({
        loadedOnce: true,
        availableDays: user.availableDays,
        timeZone: user.timezone,
        startTime: user.availableHours.start,
        endTime: user.availableHours.end,
      });
    })
    .catch((error) => {
      alert(error);
    });
};

export { getHostInfo };
