import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import fetchMe from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';

interface IAuthContext {
  loggedInUser: User;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: {} as User,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User>({
    _id: '',
    email: '',
    username: '',
    name: '',
    timezone: '',
    availableHours: [],
    availableDays: [],
  });
  const history = useHistory();

  const updateLoginContext = useCallback((data: AuthApiDataSuccess) => {
    setLoggedInUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser({} as User);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkFetchMe = async () => {
      await fetchMe().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser({} as User);
          history.push('/login');
        }
      });
    };
    checkFetchMe();
  }, [updateLoginContext, history]);

  return <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
