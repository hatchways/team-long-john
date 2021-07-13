export interface User {
  email: string;
  username: string;
  name: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
