import { Dispatch, SetStateAction } from 'react';

export type STATE_PROPS = {
  carsData: any;
  isLoading: boolean;
  carData: any;
  fetchCarData: ((makeId: number, year: number) => Promise<void>) | null;
};

export const reducer = (
  state: STATE_PROPS,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'carsData':
      return {
        ...state,
        carsData: action.payload.carsData,
      };
    case 'carData':
      return {
        ...state,
        carData: action.payload.carData,
      };
    default:
      return state;
  }
};
