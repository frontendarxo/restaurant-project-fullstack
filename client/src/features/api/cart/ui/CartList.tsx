import type { CartItem } from '../../../../types/food';
import { CartItem as CartItemComponent } from './CartItem';
import './style.css';

interface CartListProps {
  items: CartItem[];
}

export const CartList = ({ items }: CartListProps) => {
  if (items.length === 0) {
    return <div className="cart-empty">Корзина пуста</div>;
  }

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItemComponent key={item.food._id} item={item} />
      ))}
    </div>
  );
};
