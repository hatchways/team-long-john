import { Moment } from 'moment-timezone';

// Interface of google event data from host user's google calendar.
export interface googleAppointmentType {
  start: string;
  end: string;
}

// Interface of list of appointments containing full data from DB.
export interface appointDataType {
  appointments: {
    duration: number;
    email: string;
    meetingId: string;
    time: string;
    timezone: string;
    username: string;
    _v: string;
    _id: string;
  }[];
}

// Interface of the data required to create a new appointment.
export interface appointmentProp {
  meetingId: string;
  hostUserName: string;
  appointeeEmail: string;
  timeZone: string;
  time: Moment;
  duration: number;
}

// Interface of the data required to load the appointment completion page.
export interface appointmentInfoProp {
  loadedOnce: boolean;
  meetingId: string;
  hostUserName: string;
  appointeeEmail: string;
  timeZone: string;
  time: string;
}
