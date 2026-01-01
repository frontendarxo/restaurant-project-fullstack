import { useAppDispatch } from '../../../../store/hooks';
import { addItem, updateItem, removeItem, clear } from '../../../../store/slices/cartSlice';

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const handleAddItem = (foodId: string, quantity: number) => {
    dispatch(addItem({ foodId, quantity }));
  };

  const handleUpdateItem = (foodId: string, quantity: number) => {
    dispatch(updateItem({ foodId, quantity }));
  };

  const handleRemoveItem = (foodId: string) => {
    dispatch(removeItem(foodId));
  };

  const handleClearCart = () => {
    dispatch(clear());
  };

  return {
    addItem: handleAddItem,
    updateItem: handleUpdateItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
  };
};

