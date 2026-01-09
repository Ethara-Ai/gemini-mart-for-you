import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { products } from '../data/products';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  
  const searchQuery = params.get('search') || '';
  const categoryFilter = params.get('category') || 'All';
  const saleFilter = params.get('sale') === 'true';

  const categories: string[] = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesSale = !saleFilter || product.isSale;

      return matchesSearch && matchesCategory && matchesSale;
    });
  }, [searchQuery, categoryFilter, saleFilter]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(location.search);
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                </h3>
                {(categoryFilter !== 'All' || saleFilter || searchQuery) && (
                    <button 
                        onClick={() => navigate('/products')}
                        className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Clear All
                    </button>
                )}
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</h4>
              <div className="flex flex-col gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat === 'All' ? null : cat)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      categoryFilter === cat
                        ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={saleFilter}
                        onChange={(e) => updateFilter('sale', e.target.checked ? 'true' : null)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">On Sale Only</span>
                </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchQuery ? `Results for "${searchQuery}"` : 
               categoryFilter !== 'All' ? categoryFilter : 'All Products'}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 dark:bg-gray-800">
                    <Filter className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-2">
                    Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                    className="mt-6" 
                    variant="outline"
                    onClick={() => navigate('/products')}
                >
                    Clear Filters
                </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

