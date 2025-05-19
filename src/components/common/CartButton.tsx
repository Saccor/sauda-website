import React, { forwardRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Create a ref-forwarding CartButton
const CartButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { items, isOpen, setIsOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className="relative p-2 text-white hover:text-gray-300 transition-colors"
      aria-label="Shopping cart"
      {...props}
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
});

CartButton.displayName = 'CartButton';

export default CartButton; 