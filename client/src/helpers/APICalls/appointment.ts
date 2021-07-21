import { RouteComponentProps } from 'react-router-dom';
import { appointmentInfoProp, appointmentProp } from '../../interface/AppointmentProps';

const getAppointInfo = (
  appointId: string,
  setter: React.Dispatch<React.SetStateAction<appointmentInfoProp>>,
  history: RouteComponentProps['history'],
  updateSnackBarMessage: (message: string) => void,
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
        updateSnackBarMessage('This meeting no longer exists!');
        history.push('/login');
      }
    })
    .then((data) => {
      if (data) {
        const appointment = data.success.appointment;
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
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const CreateAppointment = (
  props: appointmentProp,
  googleEventId: string,
  history: RouteComponentProps['history'],
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = '/appointment';
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      meetingId: props.meetingId,
      hostGoogleEid: googleEventId,
      hostUserName: props.hostUserName,
      hostName: props.hostName,
      hostEmail: props.hostEmail,
      appointeeGoogleEid: 'N/A',
      appointeeName: props.appointeeName,
      appointeeEmail: props.appointeeEmail,
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
      if (res && res.status === 201) return res.json();
    })
    .then((data) => {
      if (data) history.push(`/completion/${data.success.appointment._id}`);
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

const deleteAppointment = (appointId: string, updateSnackBarMessage: (message: string) => void): void => {
  const url = `/appointment/${appointId}`;
  const request = new Request(url, {
    method: 'DELETE',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) updateSnackBarMessage('The appointment has been deleted.');
      else if (res && res.status === 404) updateSnackBarMessage('This meeting no longer exists!');
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

export { getAppointInfo, deleteAppointment, CreateAppointment };
