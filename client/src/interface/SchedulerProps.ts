import { Moment } from 'moment-timezone';

type changeEventHandler = (args: React.ChangeEvent<{ value: unknown }>) => void;
type clickEventHandler = (args: React.MouseEvent<HTMLButtonElement>) => void;
type strBoolFunc = (args: string) => boolean;
type simpleFunc = () => void;

// Used to specify information required to disable some timeslots on scheduler.
export interface disableDateProp {
  activeStartDate: Date;
  date: Date;
  view: string;
}

// Specified information being to loaded from useLocation.
// The information was initally setup in /shared and passed to /scheduler with useHistory.
export interface schedLocationProp {
  username: string;
  meetingId: string;
  duration: number;
  meetingTitle: string;
  hostInfo: hostInfoProp;
}

// Used to take username and meeting ID from url /shared/:username/:meetingId
export interface schedUrlProp {
  username: string;
  meetingId: string;
}

// Used to take appointment ID from url /completion/:appointID.
export interface completionUrlProp {
  appointID: string;
}

// Interface used to pass required information to Confirmation.
export interface confirmProp {
  hostEmail: string;
  meetingTitle: string;
  username: string;
  meetingId: string;
  duration: number;
  timeZone: string;
  time: Moment;
  cancelConfirmation: simpleFunc;
}

// Used for timezone selection on scheduler.
export interface TimeZone {
  [key: string]: { tZone: string; abbr: string };
}

// Interface used to pass required information to BuildTimeZones.
export interface BTZProps {
  userTimeZone: string;
  changeTimeZone: changeEventHandler;
}

// Interface used to pass required information to TimePopulator.
export interface TPProps {
  startTime: string;
  endTime: string;
  userTimeZone: string;
  timeZone: string;
  today: Date;
  duration: number;
  checkConfirmation: clickEventHandler;
  checkDisableTime: strBoolFunc;
}

// Interface required to pass partial host user info to build hostInfoProp object.
export interface userDataType {
  availableDays: string[];
  availableHours: {
    start: string;
    end: string;
  };
  email: string;
  timezone: string;
}

// Interface containing concise info of all host user's appointments.
// Takes information from either googleAppointmentType object or appointDataType object.
export interface appointCompProp {
  duration: number;
  appointment: Date;
}

// Interface containing full information of the host user used for scheduler.
export interface hostInfoProp {
  loadedOnce: boolean;
  hostEmail: string;
  availableDays: string[];
  timeZone: string;
  startTime: string;
  endTime: string;
  appointments: appointCompProp[];
}
