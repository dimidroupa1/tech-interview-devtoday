import { Context } from '@/lib/Provider/context';
import React, { useContext, useLayoutEffect } from 'react';

type Props = {
  params: any;
};

const CarModel = ({ params }: Props) => {
  const { fetchCarData, carData } = useContext(Context);
  const { slug: makeId, id: year } = params;

  useLayoutEffect(() => {
    fetchCarData && fetchCarData(makeId, year);
  }, []);
  return (
    <div className="flex-[0.8] mt-8 px-6">
      <h1>
        Model Page for Make ID: {makeId} and Year: {year}
      </h1>

      <ul>
        {carData &&
          carData.map((model: any) => (
            <li key={model.Model_ID}>
              {model.Make_Name} - {model.Model_Name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CarModel;
