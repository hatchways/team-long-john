import moment from 'moment-timezone';
import { RouteComponentProps } from 'react-router-dom';
import { appointCollectProp, appointmentProp, hostInfoProp } from '../../interface/SchedulerProps';

type setAppointType = (prop: appointCollectProp) => void;

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
        const user = data.success.user;
        setter({
          loadedOnce: true,
          hostEmail: user.email,
          availableDays: user.availableDays,
          timeZone: user.timezone,
          startTime: user.availableHours.start,
          endTime: user.availableHours.end,
        });
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const CreateAppointment = (props: appointmentProp, history: RouteComponentProps['history']): void => {
  const url = '/appointment';
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      meetingId: props.meetingId,
      username: props.hostUserName,
      email: props.appointeeEmail,
      time: props.time.toISOString(),
      duration: props.duration,
      timezone: props.timeZone,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 201) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        history.push(`/completion/${data.success.appointment._id}`);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const loadAppointments = (
  username: string,
  userTZ: string,
  setter: React.Dispatch<React.SetStateAction<appointCollectProp>>,
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
        const appointments = data.success.appointments;
        const output = [];
        for (let i = 0; i < appointments.length; i++) {
          output.push({
            duration: appointments[i].duration,
            appointment: new Date(appointments[i].time),
          });
        }
        // Sort the array in non-decreasing order of moments.
        output.sort((a, b): number => {
          if (a.appointment < b.appointment) {
            return -1;
          } else if (a.appointment > b.appointment) {
            return 1;
          }
          return 0;
        });
        setter({
          loadedOnce: true,
          appointments: output,
        });
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export { getHostInfo, CreateAppointment, loadAppointments };
