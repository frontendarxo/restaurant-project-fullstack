import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { checkAuth } from '../store/slices/authSlice';
import { AppRouter } from "./router"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
