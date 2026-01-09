import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button onClick={() => navigate('/products')} size="lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
      
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="flex gap-4 p-4 sm:gap-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="font-bold text-gray-900 dark:text-white sm:text-lg">
                      ${((item.isSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 hover:text-blue-600 dark:hover:bg-gray-800"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="p-2 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-30 dark:hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
          
          <div className="flex justify-end pt-4">
             <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={clearCart}>
                Clear Cart
             </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <Card className="p-6 sticky top-24">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-200 py-3 dark:border-gray-700">
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                  <span>Estimated Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full" size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
             <p className="mt-4 text-xs text-center text-gray-500">
                Free shipping on orders over $50
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

