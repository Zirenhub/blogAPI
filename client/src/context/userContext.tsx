import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/user';

const UserContext = createContext<any>(null);

interface UserContextProps {
  children: ReactNode;
}

function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null);

  const userValue = useMemo(() => [user, setUser], [user]);

  useEffect(() => {
    async function checkLoggedIn() {
      const res = await fetch('http://localhost:7500/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setUser(resData.data);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
