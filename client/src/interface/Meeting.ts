export interface Meeting {
  userId: string;
  name: string;
  duration: number;
}

export interface Meetings {
  [index: number]: { _id: string; userId: string; name: string; duration: number };
}

export interface MeetingsApiData {
  success?: {
    data: Meetings;
  };
  error?: { message: string };
}
