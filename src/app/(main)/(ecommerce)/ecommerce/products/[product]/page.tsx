import { Metadata } from 'next';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';
import ProductSettings from '../components/ProductPage';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'CMS - Website Configurator',
  description: '...',
};

export const dynamic = `force-dynamic`;

async function Product({ params }: { params: { product: string } }) {
  const product: ProductType = await getData(API_ROUTES.ECOMMERCE_PRODUCTS, params.product, true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductSettings product={product} />
    </Suspense>
  );
}

export default Product;
