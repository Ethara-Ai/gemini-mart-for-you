import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer } from '../common/ToastContainer';
import { CartModal } from '../features/CartModal'; 
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Don't show Nav/Footer on Landing Page
  const isLanding = location.pathname === '/'; 

  if (isLanding) {
      return (
          <>
            {children}
            <ToastContainer />
          </>
      );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ToastContainer />
      <CartModal />
    </div>
  );
};
