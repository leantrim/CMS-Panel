import { Metadata } from 'next';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';

export const metadata: Metadata = {
  title: 'CMS - Website Configurator',
  description: '...',
};

async function Store({ params }: { params: { store: string } }) {
  const data: StoreType = await getData(API_ROUTES.ECOMMERCE_SITES, params.store, true);
  console.log(params.store);
  console.log(data);

  return <div>DATA: {data.name}</div>;
}

export default Store;
