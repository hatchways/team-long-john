import { Dispatch, SetStateAction } from 'react';
import { FetchOptions } from '../../interface/FetchOptions';
import { MeetingsApiData } from '../../interface/Meeting';

export const fetchMeetings = async (id: string): Promise<MeetingsApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/meeting?userId=${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
