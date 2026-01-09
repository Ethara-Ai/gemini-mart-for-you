import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    // Check system preference if not stored - actually useLocalStorage handles initial logic, 
    // but for system preference we need a bit more logic in initialization or effect
    
    // If we want to respect system preference on first visit (when no local storage), 
    // we should have handled it in useLocalStorage init. 
    // But since useLocalStorage is generic, let's just apply the class here.
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
  }, [theme]);

    // Initial check for system preference if user hasn't set one?
    // The useLocalStorage hook defaults to 'light'. Let's improve this.
    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme');
        if (!storedTheme) {
             const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
             setTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }, [setTheme]);


  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

