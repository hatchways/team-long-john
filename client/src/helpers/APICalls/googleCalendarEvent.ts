import { RouteComponentProps } from 'react-router-dom';
import { CreateAppointment } from './appointment';
import {
  appointeeGEventProp,
  appointmentInfoProp,
  appointmentProp,
  googleCreateEventProp,
} from '../../interface/AppointmentProps';

const addGoogleAppointee = (
  props: appointeeGEventProp,
  googleEventId: string,
  setter: React.Dispatch<React.SetStateAction<appointmentInfoProp>>,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `/appointment/${props.appointmentId}`;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify({
      appointeeGoogleEid: googleEventId,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) return res.json();
      else updateSnackBarMessage('Google event could not be created for the appointee. ');
    })
    .then((data) => {
      if (data) {
        const appointment = data.success.appointments;
        setter({
          meetingId: appointment.meetingId,
          hostGoogleEid: appointment.hostGoogleEid,
          hostUserName: appointment.hostUserName,
          hostName: appointment.hostName,
          hostEmail: appointment.hostEmail,
          appointeeGoogleEid: appointment.appointeeGoogleEid,
          appointeeName: appointment.appointeeName,
          appointeeEmail: appointment.appointeeEmail,
          timeZone: appointment.timezone,
          time: appointment.time,
        });
      }
      updateSnackBarMessage('Appointment has been added to your google calendar!');
    })
    .catch((error) => updateSnackBarMessage(error));
};

const CreateGoogleEvent = (
  forHost: boolean,
  googleProps: googleCreateEventProp,
  props: appointmentProp | appointeeGEventProp,
  updateSnackBarMessage: (message: string) => void,
  history?: RouteComponentProps['history'],
  setter?: React.Dispatch<React.SetStateAction<appointmentInfoProp>>,
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
      if (res && res.status === 201) return res.json();
      else {
        updateSnackBarMessage(
          'Event could not be added to google calendar. If you are an appointee, ' +
            'this time slot might already be occupied in your own calendar.',
        );
      }
    })
    .then((data) => {
      if (data) {
        if (forHost) {
          if ('appointmentId' in props) {
            updateSnackBarMessage('You are passing in appointee information when forHost is true.');
          } else if (history === undefined) {
            updateSnackBarMessage('You must provide history if forHost is true.');
          } else {
            CreateAppointment(props, data.success.googleEventId, history, updateSnackBarMessage);
          }
        } else {
          if (!('appointmentId' in props)) {
            updateSnackBarMessage('You are passing in host user information when forHost is false.');
          } else if (setter === undefined) {
            updateSnackBarMessage('You must provide setter if forHost is false.');
          } else {
            addGoogleAppointee(props, data.success.googleEventId, setter, updateSnackBarMessage);
          }
        }
      }
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const deleteGoogleEvent = (email: string, eventId: string, updateSnackBarMessage: (message: string) => void): void => {
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
      if (!(res && res.status === 200)) updateSnackBarMessage(`The appointment could not be deleted for ${email}.`);
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

export { CreateGoogleEvent, deleteGoogleEvent };
