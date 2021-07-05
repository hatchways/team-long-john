import { createContext, useContext, useState, FunctionComponent } from 'react';

interface AuthContext {
  isDemoStatus: boolean;
  updateIsDemoContext: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  isDemoStatus: false,
  updateIsDemoContext: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [isDemoStatus, setIsDemo] = useState<boolean>(false);

  const updateIsDemoContext = (status: boolean) => {
    setIsDemo(status);
  };

  return <AuthContext.Provider value={{ isDemoStatus, updateIsDemoContext }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}
