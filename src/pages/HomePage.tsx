import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ProductCard } from '../components/common/ProductCard';
import { products } from '../data/products';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Featured products
  const featuredProducts = useMemo(() => {
    // Show 4 random sale items or popular items
    return products.filter(p => p.isSale).slice(0, 4);
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
         <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
                alt="Hero Background" 
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
         </div>

         <div className="relative container mx-auto flex h-full flex-col justify-center px-4 text-white">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
                <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-7xl">
                    Discover What's <br/>
                    <span className="text-blue-400">Next For You</span>
                </h1>
                <p className="mb-8 text-xl text-gray-200">
                    Premium quality products across electronics, fashion, and home. 
                    Curated for your lifestyle.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button 
                        size="lg" 
                        className="rounded-full px-8 py-6 text-lg"
                        onClick={() => navigate('/products')}
                    >
                        Shop Now
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full border-white px-8 py-6 text-lg text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10"
                        onClick={() => navigate('/products?sale=true')}
                    >
                        View Sales
                    </Button>
                </div>
            </motion.div>
         </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
                { icon: Truck, title: 'Fast Shipping', desc: 'Free delivery on orders over $50' },
                { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure payment processing' },
                { icon: TrendingUp, title: 'Best Quality', desc: 'Hand-picked products just for you' }
            ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <Button variant="ghost" onClick={() => navigate('/products')}>View All <ArrowRight className="ml-2 h-4 w-4"/></Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((cat) => (
                <Card 
                    key={cat} 
                    className="group relative h-48 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
                >
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full w-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <h3 className="text-xl font-bold text-white shadow-sm">{cat}</h3>
                    </div>
                </Card>
            ))}
        </div>
      </section>

      {/* Featured Products */}
       <section className="container mx-auto px-4">
         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Trending Now</h2>
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
         </div>
       </section>

    </div>
  );
};
