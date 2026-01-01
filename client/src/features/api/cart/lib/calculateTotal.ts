import type { CartItem } from '../../../../types/food';

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);
};

