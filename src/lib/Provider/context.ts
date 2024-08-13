import { createContext } from 'react';
import { STATE_PROPS } from './reducer';

export const INITIAL_STATE = {
  carsData: null,
  isLoading: true,
  carData: null,
  fetchCarData: null,
};

export const Context = createContext<STATE_PROPS>(INITIAL_STATE);
