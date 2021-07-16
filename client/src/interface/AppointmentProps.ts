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
  appointeeName: string;
  appointeeEmail: string;
  timeZone: string;
  time: Moment;
  duration: number;
}

// Interface of the data required to load the appointment completion page.
export interface appointmentInfoProp {
  loadedOnce: boolean;
  meetingId: string;
  hostGoogleEid: string;
  appointeeGoogleEid: string;
  appointeeName: string;
  appointeeEmail: string;
  timeZone: string;
  time: string;
}

// Used to pass required information to create an event in host user's google calendar.
export interface googleCreateEventProp {
  email: string;
  summary: string;
  location: string;
  description: string;
  startISO: string;
  duration: number;
  timeZone: string;
  colorId: number;
}

// Used to pass required information to create an event in appointee's google calendar.
export interface appointeeGEventProp {
  appointmentId: string;
}
