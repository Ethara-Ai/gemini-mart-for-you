import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import type { ShippingTier } from '../types';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [shippingTier, setShippingTier] = useState<ShippingTier>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Redirect if empty cart
  useEffect(() => {
    if (items.length === 0 && step !== 'success') {
      navigate('/cart');
    }
  }, [items, navigate, step]);

  const shippingCosts = {
    free: 0,
    standard: 12,
    express: 25
  };
  
  // Logic: Free shipping if subtotal > 50 and 'standard' selected? 
  // User asked for "free slow shipping", "mid-priced standard", "express".
  // Let's adjust logic.
  
  const shippingOptions: { id: ShippingTier; name: string; price: number; time: string }[] = [
      { id: 'free', name: 'Saver Shipping', price: shippingCosts.free, time: '5-7 business days' },
      { id: 'standard', name: 'Standard Shipping', price: shippingCosts.standard, time: '3-5 business days' },
      { id: 'express', name: 'Express Shipping', price: shippingCosts.express, time: '1-2 business days' }
  ];

  const shippingCost = shippingOptions.find(o => o.id === shippingTier)?.price || 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setStep('success');
    clearCart();
    addToast('Order placed successfully!', 'success');
  };

  if (step === 'success') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mb-6 rounded-full bg-green-100 p-6 dark:bg-green-900/30"
        >
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
        </motion.div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          Thank you for your purchase, {user.name.split(' ')[0]}.
        </p>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          Your order number is <span className="font-mono font-medium text-gray-900 dark:text-white">{orderNumber}</span>.
          We've sent a confirmation email to {user.email}.
        </p>
        <Button onClick={() => navigate('/products')} size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
      
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Section 1: Shipping Info (Read only for now as we pull from profile, or editable form?)
              User said "Users need a profile where they can manage their personal info... checkout should be simulated"
              I'll just show the address from context and allow editing in profile or here. 
              For simplicity, I'll show it as confirmed.
          */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Truck className="h-5 w-5" /> Shipping Address
            </h2>
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
               <div>
                   <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                   <p>{user.email}</p>
                   <p>{user.phone}</p>
               </div>
               <div>
                   <p>{user.address.street}</p>
                   <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                   <p>{user.address.country}</p>
               </div>
            </div>
            <div className="mt-4">
                 <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>Edit Address</Button>
            </div>
          </Card>

          {/* Section 2: Shipping Method */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Truck className="h-5 w-5" /> Shipping Method
            </h2>
            <div className="space-y-3">
                {shippingOptions.map((option) => (
                    <label 
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                            shippingTier === option.id 
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' 
                            : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                name="shipping" 
                                checked={shippingTier === option.id}
                                onChange={() => setShippingTier(option.id)}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{option.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{option.time}</p>
                            </div>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                        </p>
                    </label>
                ))}
            </div>
          </Card>

          {/* Section 3: Payment (Fake) */}
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <CreditCard className="h-5 w-5" /> Payment Details
            </h2>
            <div className="space-y-4">
                <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM/YY" />
                    <Input label="CVC" placeholder="123" />
                </div>
                <Input label="Cardholder Name" placeholder={user.name} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Payments are secure and encrypted.
            </div>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
          <Card className="p-6 sticky top-24">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
            
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                 {items.map(item => (
                     <div key={item.id} className="flex justify-between text-sm">
                         <span className="text-gray-600 dark:text-gray-300 truncate w-2/3">{item.quantity}x {item.name}</span>
                         <span className="font-medium">${((item.isSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}</span>
                     </div>
                 ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 py-3 dark:border-gray-700">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button 
                className="mt-6 w-full" 
                size="lg" 
                onClick={handlePlaceOrder}
                isLoading={isProcessing}
            >
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

