import { RouteComponentProps } from 'react-router-dom';
import { appointCompProp, hostInfoProp, userDataType } from '../../interface/SchedulerProps';
import { processAppointments, processGoogleAppointments } from '../../pages/Scheduler/helper/processAppointments';

const getHostInfo = (
  username: string,
  setter: React.Dispatch<React.SetStateAction<hostInfoProp>>,
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
      if (res && res.status === 200) {
        return res.json();
      } else if (res && res.status === 404) {
        updateSnackBarMessage('There is no user with the specified username.');
        history.push('/login');
      }
    })
    .then((data) => {
      if (data) {
        const userdata = data.success.user;
        const selectiveUserData = {
          id: userdata.id,
          email: userdata.email,
          name: userdata.name,
          availableDays: userdata.availableDays,
          timeZone: userdata.timezone,
          startTime: userdata.availableHours.start,
          endTime: userdata.availableHours.end,
        };
        loadAppointments(username, selectiveUserData, setter, updateSnackBarMessage);
      }
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const loadAppointments = (
  username: string,
  userdata: userDataType,
  setter: React.Dispatch<React.SetStateAction<hostInfoProp>>,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `/appointment?username=${username}`;
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) return res.json();
      else if (res && res.status === 404) processAppointments(userdata, { appointments: [] }, setter);
    })
    .then((data) => {
      if (data && data.success) processAppointments(userdata, data.success, setter);
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const loadGoogleAppointments = (
  email: string,
  startOfDay: string,
  setter: React.Dispatch<React.SetStateAction<appointCompProp[]>>,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `/googleAvailability?startISO=${startOfDay}&email=${email}`;
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) return res.json();
    })
    .then((data) => processGoogleAppointments(data, setter))
    .catch((error) => updateSnackBarMessage(error.message));
};

export { getHostInfo, loadAppointments, loadGoogleAppointments };
