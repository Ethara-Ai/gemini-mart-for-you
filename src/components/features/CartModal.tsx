import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const CartModal: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  // Prevent body scroll when cart is open
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</p>
                  <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added anything yet.</p>
                  <Button onClick={() => { closeCart(); navigate('/products'); }}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3 className="line-clamp-1"><a href="#">{item.name}</a></h3>
                          <p className="ml-4">
                            ${((item.isSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                        
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-blue-600"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="p-1 hover:text-blue-600 disabled:opacity-30"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-6 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="space-y-3">
                    <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    >
                    Checkout
                    </Button>
                    <Button
                    onClick={() => { closeCart(); navigate('/cart'); }} // Full cart page
                    variant="outline"
                    className="w-full"
                    >
                    View Cart
                    </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

