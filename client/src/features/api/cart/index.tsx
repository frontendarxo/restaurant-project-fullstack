import { useCart } from './model';
import { CartList, CartTotal } from './ui';
import './style.css';

export const Cart = () => {
  const { items, isLoading, error } = useCart();

  if (isLoading) {
    return <div className="cart-loading">Загрузка корзины...</div>;
  }

  if (error) {
    return <div className="cart-error">Ошибка: {error}</div>;
  }

  return (
    <div className="cart">
      <h1>Корзина</h1>
      <CartList items={items} />
      {items.length > 0 && <CartTotal items={items} />}
    </div>
  );
};
