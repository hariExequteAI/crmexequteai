import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'admin' | 'agent';

interface DemoAccount {
  email: string;
  password: string;
  role: Role;
}

interface User {
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const demoAccounts: DemoAccount[] = [
  { email: 'admin@company.com', password: 'password', role: 'admin' },
  { email: 'agent@company.com', password: 'password', role: 'agent' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    return new Promise(resolve => {
      // simulate network delay
      setTimeout(() => {
        const found = demoAccounts.find(
          acc => acc.email === email && acc.password === password
        );
        if (found) {
          setUser({ email: found.email, role: found.role });
          setIsAuthenticated(true);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
