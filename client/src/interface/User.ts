export interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  timezone: string;
  availableHours: {
    start: string;
    end: string;
  };
  availableDays: string[];
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
