import { createContext, useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

interface AuthContext {
  isDemo: boolean;
}

export const AuthContext = createContext<AuthContext>({
  isDemo: false,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const history = useHistory();

  return <AuthContext.Provider value={{ isDemo }}>{children}</AuthContext.Provider>;
};

export default createContext(AuthContext);
