import { hostInfoProp } from '../../interface/SchedulerProps';
import processAppointments from '../../pages/Scheduler/helper/processAppointments';

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
      if (data) {
        const userdata = data.success.user;
        loadAppointments(username, userdata, setter);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const loadAppointments = (
  username: string,
  userdata: any,
  setter: React.Dispatch<React.SetStateAction<hostInfoProp>>,
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
      if (res && res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data && data.success) {
        processAppointments(userdata, data, setter);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const loadGoogleAppointments = (email: string, startOfDay: any): void => {
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
      if (res && res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert(error);
    });
};

export { getHostInfo, loadAppointments, loadGoogleAppointments };
