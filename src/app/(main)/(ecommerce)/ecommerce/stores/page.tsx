import React from 'react';
import Store from './Components/store';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';

const page = async () => {
  const stores: StoreType[] = await getData(API_ROUTES.ECOMMERCE_SITES);
  return <Store stores={stores} />;
};

export default page;
