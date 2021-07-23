import { FetchOptions } from '../../interface/FetchOptions';
import { MeetingsApiData } from '../../interface/Meeting';
import { meetingInfoProp } from '../../interface/SchedulerProps';

export const fetchMeetings = async (
  id: string,
  updateSnackBarMessage: (message: string) => void,
): Promise<MeetingsApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/meeting?userId=${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => updateSnackBarMessage(error.message));
};

export const getMeetingInfo = (
  meetingId: string,
  setter: React.Dispatch<React.SetStateAction<meetingInfoProp>>,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `/meeting/${meetingId}`;
  const request = new Request(url, {
    method: 'GET',
    credentials: 'include',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) return res.json();
      else updateSnackBarMessage('Meeting information could not be retrieved.');
    })
    .then((data) => {
      if (data && data.success) {
        const meeting = data.success.meeting;
        setter({
          userId: meeting.userId,
          meetingTitle: meeting.name,
          duration: meeting.duration,
        });
      }
    })
    .catch((error) => updateSnackBarMessage(error.message));
};

export const editMeetingInfo = (
  meetingId: string,
  name: string,
  duration: string,
  updateSnackBarMessage: (message: string) => void,
): void => {
  const url = `/meeting/${meetingId}`;
  const request = new Request(url, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({
      name: name,
      duration: duration,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 400) {
        updateSnackBarMessage('Meeting with the given id could not be updated.');
      }
    })
    .catch((error) => {
      updateSnackBarMessage(error);
    });
};
