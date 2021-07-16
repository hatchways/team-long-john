import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { hostInfoProp, schedUrlProp } from '../../interface/SchedulerProps';
import { getHostInfo } from '../../helpers/APICalls/scheduler';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';

export default function SchedulerWrapper(): JSX.Element {
  // The purpose of the scheduler wrapper is to make a single call to load the user information,
  // and then pass this information to the scheduler.

  const history = useHistory();
  // This is the username of the person who is hosting the appointment.
  const { username, meetingId } = useParams<schedUrlProp>();
  const duration = 30;

  const [hostInfo, setHostInfo] = useState<hostInfoProp>({
    loadedOnce: false,
    hostEmail: '',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeZone: 'America/Toronto',
    startTime: '08:00',
    endTime: '09:00',
    appointments: [],
  });
  // loadedOnce param exists to avoid infinite recursion caused by updating hostInfo.
  // Also, after being loaded once, we can send all of the information to scheduler.
  useEffect(() => {
    if (!hostInfo.loadedOnce) {
      getHostInfo(username, setHostInfo, history);
    } else {
      history.push({
        pathname: `/scheduler`,
        state: {
          username: username,
          meetingId: meetingId,
          duration: duration,
          hostInfo: hostInfo,
        },
      });
    }
  }, [hostInfo, username, history, meetingId]);
  return <Box />;
}
