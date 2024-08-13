'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { Context, INITIAL_STATE } from './context';
import { reducer } from './reducer';
import { usePathname } from 'next/navigation';
import xml2js from 'xml2js';

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  // get cars data
  const setCarsData = (value: any) => {
    dispatch({
      type: 'carsData',
      payload: {
        carsData: value,
      },
    });
  };

  // get car data
  const setCarData = (value: any) => {
    dispatch({
      type: 'carData',
      payload: {
        carData: value,
      },
    });
  };

  const fetchCarsData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/GetMakesForVehicleType/car?format=json`
      );
      const data = await response.json();

      setCarsData(data.Results);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchCarData = async (makeId: number, year: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      const data = await response.json();

      setCarData(data.Results);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, [pathname]);

  const payload = {
    ...state,
    isLoading,
    fetchCarData,
  };
  return <Context.Provider value={payload}>{children}</Context.Provider>;
};

export default Provider;
