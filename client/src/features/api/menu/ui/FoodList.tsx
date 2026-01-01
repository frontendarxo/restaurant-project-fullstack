import type { Food } from '../../../../types/food';
import { FoodCard } from './FoodCard';
import './style.css';

interface FoodListProps {
  foods: Food[];
}

export const FoodList = ({ foods }: FoodListProps) => {
  if (foods.length === 0) {
    return <div className="food-list-empty">Товары не найдены</div>;
  }

  return (
    <div className="food-list">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  );
};

