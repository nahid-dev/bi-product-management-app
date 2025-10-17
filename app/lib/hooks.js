import { useDispatch, useSelector } from 'react-redux';

// Typed hooks for Redux
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Auth hooks
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  
  return {
    ...auth,
    dispatch,
  };
};
