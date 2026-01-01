import type { Order } from '../../../../types/order';
import { formatPrice } from '../../cart/lib';
import './style.css';

interface OrderCardProps {
  order: Order;
}

const getStatusText = (status: Order['status']): string => {
  const statusMap = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтвержден',
    preparing: 'Готовится',
    ready: 'Готов',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
  };
  return statusMap[status] || status;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const formattedDate = order.formatted_created_at || order.created_at;

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-card-info">
          <span className="order-card-id">Заказ #{order._id.slice(-6)}</span>
          <span className="order-card-date">{formattedDate}</span>
        </div>
        <span className={`order-card-status order-card-status-${order.status}`}>
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="order-card-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-card-item">
            <span className="order-card-item-name">{item.food.name}</span>
            <span className="order-card-item-quantity">x{item.quantity}</span>
            <span className="order-card-item-price">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="order-card-footer">
        <span className="order-card-total">Итого: {formatPrice(order.total)}</span>
      </div>
    </div>
  );
};

