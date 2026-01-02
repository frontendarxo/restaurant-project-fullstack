import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrders, clearError } from '../../store/slices/orderSlice';
import { OrderList } from '../../features/api/order/ui/OrderList';
import './style.css';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(clearError());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchOrders());
  };

  const safeOrders = orders || [];
  const ordersCount = safeOrders.length;

  return (
    <div className="orders">
      <div className="orders-header">
        <h1 className="orders-title">Мои заказы</h1>
        {!isLoading && !error && ordersCount > 0 && (
          <p className="orders-subtitle">Всего заказов: {ordersCount}</p>
        )}
      </div>

      {isLoading ? (
        <div className="orders-loading">
          <div className="orders-loading-spinner"></div>
          <p>Загрузка заказов...</p>
        </div>
      ) : error ? (
        <div className="orders-error">
          <div className="orders-error-icon">⚠️</div>
          <p className="orders-error-message">Ошибка: {error}</p>
          <button
            className="orders-error-retry"
            onClick={handleRetry}
          >
            Попробовать снова
          </button>
        </div>
      ) : (
        <OrderList orders={safeOrders} />
      )}
    </div>
  );
};

