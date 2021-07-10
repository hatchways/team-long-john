import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const loginWithCookies = async (): Promise<AuthApiData> => {
  const fetchOptions: any = {
    method: 'GET',
  };
  return await fetch(`http://localhost:3001/users/me`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default loginWithCookies;
