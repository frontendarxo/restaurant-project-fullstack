import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCart } from '../../../../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return {
    items,
    isLoading,
    error,
  };
};

