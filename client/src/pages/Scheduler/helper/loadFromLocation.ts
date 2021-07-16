import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { schedLocationProp } from '../../../interface/SchedulerProps';

const loadFromLocation = (
  location: RouteComponentProps<Record<string, never>, StaticContext, schedLocationProp>['location'],
): schedLocationProp => {
  const username = location.state === undefined ? '' : location.state.username;
  const meetingId = location.state === undefined ? '' : location.state.meetingId;
  const duration = location.state === undefined ? 30 : location.state.duration;
  const meetingTitle = location.state === undefined ? 'TEMP DESC' : location.state.meetingTitle;
  const hostInfo =
    location.state === undefined
      ? {
          loadedOnce: false,
          hostEmail: '',
          availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          timeZone: 'America/Toronto',
          startTime: '08:00',
          endTime: '09:00',
          appointments: [],
        }
      : location.state.hostInfo;
  return {
    username: username,
    meetingId: meetingId,
    duration: duration,
    meetingTitle: meetingTitle,
    hostInfo: hostInfo,
  };
};
export default loadFromLocation;
