import { createContext, useContext, useEffect, useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

interface AuthContext {
  isDemoStatus: boolean;
  updateIsDemoContext: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  isDemoStatus: false,
  updateIsDemoContext: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [isDemoStatus, setIsDemo] = useState<boolean>(false);
  const history = useHistory();

  // Checks if user is authenticated
  useEffect(() => {
    if (!isDemoStatus) history.push('login');
  });

  const updateIsDemoContext = (status: boolean) => {
    setIsDemo(status);
  };

  return <AuthContext.Provider value={{ isDemoStatus, updateIsDemoContext }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}
