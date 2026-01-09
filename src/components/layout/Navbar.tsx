import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Moon, Sun, ShoppingCart, User as UserIcon, LogOut, UserCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

export const Navbar: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchValue, setSearchValue] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Sync local search state with URL param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam !== null) {
      setSearchValue(searchParam);
    } else {
        if (!location.pathname.includes('/products')) {
            setSearchValue('');
        }
    }
  }, [location.search, location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Debounce this in a real app, but for "instant" feel with local data, it's fine
    // Or just push to URL
    if (location.pathname !== '/products') {
        navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        navigate(`/products?${params.toString()}`, { replace: true });
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white">Mart</span>
        </Link>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full h-10 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
        </div>

        {/* Mobile Search Icon (triggers navigation to products) */}
        <button 
            className="md:hidden text-gray-500 dark:text-gray-400"
            onClick={() => navigate('/products')}
        >
            <Search className="h-5 w-5" />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/products" className="hidden sm:block text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
            Products
          </Link>
          
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button
            onClick={openCart}
            className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pl-1 pr-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="hidden sm:block text-xs font-medium text-gray-700 dark:text-gray-200 max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                 <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                 </div>
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>
                {/* Simulated Logout */}
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

