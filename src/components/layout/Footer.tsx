import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Mart</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Mart – For You. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

