'use client';

import CarModel from '@/components/CarModel';
import React, { Suspense } from 'react';

type Props = {
  params: any;
};

const ModelPage = ({ params }: Props) => {
  return (
    <Suspense>
      <CarModel params={params} />
    </Suspense>
  );
};

export default ModelPage;
