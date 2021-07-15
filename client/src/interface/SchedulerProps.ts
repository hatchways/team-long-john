import { Moment } from 'moment-timezone';

type changeEventHandler = (args: React.ChangeEvent<{ value: unknown }>) => void;
type clickEventHandler = (args: React.MouseEvent<HTMLButtonElement>) => void;
type strBoolFunc = (args: string) => boolean;
type simpleFunc = () => void;

export interface disableDateProp {
  activeStartDate: Date;
  date: Date;
  view: string;
}

export interface schedUrlProp {
  username: string;
  meetingId: string;
}

export interface completionUrlProp {
  appointID: string;
}

export interface confirmProp {
  username: string;
  meetingId: string;
  duration: number;
  timeZone: string;
  time: Moment;
  cancelConfirmation: simpleFunc;
}

export interface TimeZone {
  [key: string]: { tZone: string; abbr: string };
}

export interface BTZProps {
  userTimeZone: string;
  changeTimeZone: changeEventHandler;
}

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

export interface hostInfoProp {
  loadedOnce: boolean;
  hostEmail: string;
  availableDays: string[];
  timeZone: string;
  startTime: string;
  endTime: string;
  appointments: appointCompProp[];
}

export interface appointmentProp {
  meetingId: string;
  hostUserName: string;
  appointeeEmail: string;
  timeZone: string;
  time: Moment;
  duration: number;
}

export interface appointmentInfoProp {
  loadedOnce: boolean;
  meetingId: string;
  hostUserName: string;
  appointeeEmail: string;
  timeZone: string;
  time: string;
}

export interface appointCompProp {
  duration: number;
  appointment: Date;
}
