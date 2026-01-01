import type { CartItem } from '../../../../types/food';
import { calculateTotal, formatPrice } from '../lib';
import { useCartActions } from '../model';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { create } from '../../../../store/slices/orderSlice';
import { useState } from 'react';
import './style.css';

interface CartTotalProps {
  items: CartItem[];
}

export const CartTotal = ({ items }: CartTotalProps) => {
  const total = calculateTotal(items);
  const { clearCart } = useCartActions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setIsCreating(true);
      await dispatch(create()).unwrap();
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="cart-total">
      <div className="cart-total-content">
        <div className="cart-total-label">Итого:</div>
        <div className="cart-total-value">{formatPrice(total)}</div>
      </div>
      <button
        className="cart-total-button"
        onClick={handleCreateOrder}
        disabled={isCreating || items.length === 0}
      >
        {isCreating ? 'Оформление...' : 'Оформить заказ'}
      </button>
    </div>
  );
};
