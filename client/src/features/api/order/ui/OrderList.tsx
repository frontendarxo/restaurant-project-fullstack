import type { Order } from '../../../../types/order';
import { OrderCard } from './OrderCard';
import './style.css';

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  if (orders.length === 0) {
    return <div className="order-list-empty">У вас пока нет заказов</div>;
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

