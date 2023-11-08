import { Metadata } from 'next';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';
import StoreInfo from '../Components/Main';

export const metadata: Metadata = {
  title: 'CMS - Website Configurator',
  description: '...',
};

async function Store({ params }: { params: { store: string } }) {
  const data = await getData(API_ROUTES.ECOMMERCE_SITES, params.store, false);

  return (
    <div>
      <StoreInfo {...data} />
    </div>
  );
}

export default Store;
