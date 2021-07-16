import { RouteComponentProps } from 'react-router-dom';
import { appointmentInfoProp, appointmentProp, googleCreateEventProp } from '../../interface/AppointmentProps';

const getAppointInfo = (
  appointId: string,
  setter: React.Dispatch<React.SetStateAction<appointmentInfoProp>>,
  history: RouteComponentProps['history'],
): void => {
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
        history.push('/login');
      }
    })
    .then((data) => {
      if (data) {
        const appointment = data.success.appointment;
        setter({
          loadedOnce: true,
          meetingId: appointment.meetingId,
          googleEventId: appointment.googleEventId,
          appointeeName: appointment.username,
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

const CreateAppointment = (
  props: appointmentProp,
  googleEventId: string,
  history: RouteComponentProps['history'],
): void => {
  const url = '/appointment';
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      meetingId: props.meetingId,
      googleEventId: googleEventId,
      username: props.appointeeName,
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

const CreateGoogleEvent = (
  googleProps: googleCreateEventProp,
  props: appointmentProp,
  history: RouteComponentProps['history'],
): void => {
  const url = '/googleCreate';
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      email: googleProps.email,
      summary: googleProps.summary,
      location: googleProps.location,
      description: googleProps.description,
      startISO: googleProps.startISO,
      duration: googleProps.duration,
      timeZone: googleProps.timeZone,
      colorId: googleProps.colorId,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status !== 200) {
        return res.json();
      } else {
        alert("Event could not be added to host's calendar.");
      }
    })
    .then((data) => {
      CreateAppointment(props, data.success.googleEventId, history);
    })
    .catch((error) => {
      alert(error);
    });
};

const deleteGoogleEvent = (email: string, eventId: string): void => {
  const url = '/googleDelete';
  const request = new Request(url, {
    method: 'DELETE',
    body: JSON.stringify({
      email: email,
      eventId: eventId,
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
        alert('The appointment has been deleted.');
      } else if (res && res.status === 404) {
        alert('This meeting no longer exists!');
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export { getAppointInfo, deleteAppointment, CreateAppointment, CreateGoogleEvent, deleteGoogleEvent };
