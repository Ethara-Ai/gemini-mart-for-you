import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast, type Toast as ToastType } from '../../context/ToastContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const ToastItem: React.FC<{ toast: ToastType; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const styles = {
    success: 'border-green-200 dark:border-green-900 bg-white dark:bg-gray-900',
    error: 'border-red-200 dark:border-red-900 bg-white dark:bg-gray-900',
    info: 'border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "flex w-full max-w-sm items-center gap-3 rounded-lg border p-4 shadow-lg pointer-events-auto",
        styles[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed z-[100] flex flex-col gap-2 p-4 pointer-events-none 
                    bottom-4 left-1/2 -translate-x-1/2 items-center
                    sm:bottom-4 sm:right-4 sm:left-auto sm:translate-x-0 sm:items-end">
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

