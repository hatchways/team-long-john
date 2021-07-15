import { RouteComponentProps } from 'react-router-dom';
import { appointmentInfoProp, appointmentProp } from '../../interface/SchedulerProps';

const getAppointInfo = (appointId: string, setter: React.Dispatch<React.SetStateAction<appointmentInfoProp>>): void => {
  const url = `/appointment/${appointId}`;
  const request = new Request(url, {
    method: 'GET',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) {
        return res.json();
      } else if (res && res.status === 404) {
        alert('This meeting no longer exists!');
      }
    })
    .then((data) => {
      if (data) {
        const appointment = data.success.appointment;
        setter({
          loadedOnce: true,
          meetingId: appointment.meetingId,
          hostUserName: appointment.username,
          appointeeEmail: appointment.email,
          timeZone: appointment.timezone,
          time: appointment.time,
        });
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const deleteAppointment = (appointId: string): void => {
  const url = `/appointment/${appointId}`;
  const request = new Request(url, {
    method: 'DELETE',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) {
        alert('The appointment has been deleted.');
      } else if (res && res.status === 404) {
        alert('This meeting no longer exists!');
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

export { getAppointInfo, deleteAppointment, CreateAppointment };
