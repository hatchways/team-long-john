import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { hostInfoProp, meetingInfoProp, schedUrlProp } from '../../interface/SchedulerProps';
import { getHostInfo } from '../../helpers/APICalls/scheduler';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';
import { getMeetingInfo } from '../../helpers/APICalls/meetings';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function SchedulerWrapper(): JSX.Element {
  // The purpose of the scheduler wrapper is to make a single call to load the user information,
  // and then pass this information to the scheduler.

  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  // This is the username of the person who is hosting the appointment.
  const { username, meetingId } = useParams<schedUrlProp>();
  const [meetingInfo, setMeetingInfo] = useState<meetingInfoProp>({
    userId: '',
    meetingTitle: '',
    duration: 10,
  });
  useEffect(() => {
    getMeetingInfo(meetingId, setMeetingInfo, updateSnackBarMessage);
  }, [meetingId, updateSnackBarMessage]);
  const [hostInfo, setHostInfo] = useState<hostInfoProp>({
    hostId: '',
    hostEmail: '',
    hostName: '',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeZone: 'America/Toronto',
    startTime: '08:00',
    endTime: '09:00',
    appointments: [],
  });
  useEffect(() => {
    getHostInfo(username, setHostInfo, history, updateSnackBarMessage);
  }, [username, history, updateSnackBarMessage]);

  useEffect(() => {
    if (meetingInfo.userId && hostInfo.hostId) {
      if (meetingInfo.userId === hostInfo.hostId) {
        history.push({
          pathname: `/scheduler`,
          state: {
            username: username,
            meetingId: meetingId,
            meetingTitle: meetingInfo.meetingTitle,
            duration: meetingInfo.duration,
            hostInfo: hostInfo,
          },
        });
      } else {
        updateSnackBarMessage('This meeting does not belong to this user.');
        history.push('/login');
      }
    }
  });
  return <Box />;
}
