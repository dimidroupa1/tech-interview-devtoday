'use client';

import { Context } from '@/lib/Provider/context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';

type Props = {};

type Car = {
  name: string;
  id: number;
};

const Sidebar = (props: Props) => {
  const { carsData, isLoading } = useContext(Context);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [listOfCarModels, setListOfCarModels] = useState<Car[]>([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedModel, setSelectedModel] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleSetListOfCarModels = () => {
    if (carsData && !isLoading) {
      const uniqueModels = new Map<number, string>();

      carsData.forEach((car: { MakeName: string; MakeId: number }) => {
        if (!uniqueModels.has(car.MakeId)) {
          uniqueModels.set(car.MakeId, car.MakeName);
        }
      });

      const uniqueCarModelArray = Array.from(uniqueModels, ([id, name]) => ({
        name,
        id,
      }));

      setListOfCarModels(uniqueCarModelArray);
    }
  };

  return (
    <div className="flex-[0.2] h-full border-r relative px-3 py-4">
      <div className="sticky top-0 w-full space-y-4">
        <div className="w-full border rounded-md">
          <div
            className="w-full px-3 py-4 cursor-pointer flex items-center justify-between"
            onClick={() => {
              setIsListOpen(!isListOpen);

              if (listOfCarModels.length == 0) {
                handleSetListOfCarModels();
              }
            }}
          >
            <h2 className="font-medium">List</h2>

            <IoMdArrowDropdown className="w-6 h-6" />
          </div>

          {isListOpen && (
            <div className="w-full pl-4 space-y-2 max-h-[500px] overflow-y-auto py-3">
              {listOfCarModels.map((carModel, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedModel(carModel.id)}
                >
                  <h3
                    className={
                      carModel.id == selectedModel ? 'font-bold pl-2' : ''
                    }
                  >
                    {carModel.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="">
          <label htmlFor="year-range" className="block font-medium">
            Select Year: {selectedYear}
          </label>
          <input
            id="year-range"
            type="range"
            min="2015"
            max={currentYear}
            value={selectedYear}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <Link
          href={
            selectedYear && selectedModel
              ? `/result/${selectedModel}/${selectedYear}`
              : ''
          }
          className={`bg-gray-900 border-none outline-none rounded-md w-full p-4 text-white font-medium relative top-4 ${
            !selectedModel || !selectedYear
              ? 'cursor-not-allowed opacity-70'
              : 'cursor-pointer'
          }`}
        >
          Apply changes
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
