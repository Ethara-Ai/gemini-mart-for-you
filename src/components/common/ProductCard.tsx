import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleAddClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product);
  }

  return (
    <Card className="flex h-full flex-col justify-between group">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {product.isSale && (
          <Badge variant="danger" className="absolute left-2 top-2 shadow-sm">
            SALE
          </Badge>
        )}
        {product.stock < 5 && product.stock > 0 && (
             <Badge variant="secondary" className="absolute right-2 top-2 shadow-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                Low Stock
             </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1" title={product.name}>
            {product.name}
            </h3>
        </div>
        
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        {/* Dynamic Category Details Preview */}
        {product.category === 'Books' && product.details['Pages'] && (
             <p className="mb-2 text-xs text-gray-500">{product.details['Pages']} pages</p>
        )}
        {product.category === 'Electronics' && product.details['Warranty'] && (
             <p className="mb-2 text-xs text-gray-500">Warranty: {product.details['Warranty']}</p>
        )}

        <div className="mt-auto">
          <div className="mb-4 flex items-end gap-2">
            {product.isSale && product.salePrice ? (
              <>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {quantity > 0 ? (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-800">
              <button
                onClick={handleDecrement}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-green-600 disabled:opacity-30 dark:hover:bg-gray-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              onClick={handleAddClick}
              disabled={product.stock === 0}
              className="w-full"
              variant={product.stock === 0 ? 'secondary' : 'primary'}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

