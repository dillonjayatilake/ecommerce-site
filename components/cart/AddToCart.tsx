'use client';

import { useState } from 'react';
import { Product } from '@/lib/products-service';
import { useCart } from '@/components/layout/Providers';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You can add a toast notification here later
    alert(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold text-gray-800">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 w-16 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            disabled={quantity >= product.inventory}
          >
            +
          </button>
        </div>
        <span className="text-gray-600">
          {product.inventory} available
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddToCart}
          disabled={product.inventory === 0}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
        >
          {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-lg border border-gray-300">
          Buy Now
        </button>
      </div>
    </div>
  );
}