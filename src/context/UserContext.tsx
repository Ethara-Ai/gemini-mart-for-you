import React, { createContext, useContext } from 'react';
import type { User } from '../types';
import { defaultUser } from '../data/user';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

interface UserContextType {
  user: User;
  updateUser: (updatedUser: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>('user-profile', defaultUser);
  const { addToast } = useToast();

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    addToast('Profile updated successfully', 'success');
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

