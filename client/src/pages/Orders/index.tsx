import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrders } from '../../store/slices/orderSlice';
import { OrderList } from '../../features/api/order/ui/OrderList';
import './style.css';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) {
    return <div className="orders-loading">Загрузка заказов...</div>;
  }

  if (error) {
    return <div className="orders-error">Ошибка: {error}</div>;
  }

  return (
    <div className="orders">
      <h1>Мои заказы</h1>
      <OrderList orders={orders} />
    </div>
  );
};

