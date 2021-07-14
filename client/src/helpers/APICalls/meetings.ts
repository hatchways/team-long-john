import { Dispatch, SetStateAction } from 'react';
import { FetchOptions } from '../../interface/FetchOptions';

interface Meeting {
  userId: string;
  duration: number;
}

export const fetchMeetings = async (
  loggedInUser: any,
  setMeetingOptions: Dispatch<SetStateAction<number[]>>,
): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  if (loggedInUser) {
    const copyOfMeetingOptions: number[] = [];

    const res = await fetch(`/meeting?userId=${loggedInUser._id}`, fetchOptions);

    const meetings = await res.json();

    if (meetings.success) {
      meetings.success.data.map((meeting: Meeting) => copyOfMeetingOptions.push(meeting.duration));

      setMeetingOptions(copyOfMeetingOptions);
    }
  }
};
