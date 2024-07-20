import { useReducer } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, toggleValue] = useReducer((state) => {
    return !state;
  }, initialValue);

  return { value, toggleValue };
};
