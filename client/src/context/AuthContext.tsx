import { createContext, useContext, useEffect, useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../interface/User';

interface AuthContext {
  loggedInUser: User | null | undefined;
}

export const AuthContext = createContext<AuthContext>({
  loggedInUser: undefined,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const history = useHistory();

  // Checks if user is authenticated
  useEffect(() => {
    if (!loggedInUser) history.push('login');
  });

  return <AuthContext.Provider value={{ loggedInUser }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}
