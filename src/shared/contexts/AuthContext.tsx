import { createContext, useCallback, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  


  
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if (result instanceof Error) {
      return result.message;
    } else {
      setAccessToken(result.accessToken);
    }

  },[]);
  
  const handleLogout = useCallback(() => {
    setAccessToken(undefined);
  },[]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout}}>
      {children}
    </AuthContext.Provider>

  );
};