import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllMenu, fetchCategory, setSelectedCategory } from '../../store/slices/menuSlice';
import { FoodList } from '../../features/api/menu/ui/FoodList';
import { CategoryFilter } from '../../features/api/menu/ui/CategoryFilter';
import './style.css';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { foods, categories, selectedCategory, isLoading, error } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchAllMenu());
  }, [dispatch]);

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
    if (category === 'all') {
      dispatch(fetchAllMenu());
    } else {
      dispatch(fetchCategory(category));
    }
  };

  if (isLoading) {
    return <div className="home-loading">Загрузка меню...</div>;
  }

  if (error) {
    return <div className="home-error">Ошибка: {error}</div>;
  }

  return (
    <div className="home">
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange} 
      />
      <FoodList foods={foods} />
    </div>
  );
};

