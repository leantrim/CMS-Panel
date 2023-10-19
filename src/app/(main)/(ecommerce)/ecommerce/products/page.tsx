import React from 'react';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

const page = async () => {
  let products: ProductType[] = [];

  try {
    products = await getData(API_ROUTES.ECOMMERCE_PRODUCTS);
  } catch (error: any) {
    return <div>Något galet har hänt med anropp till Databasen/Backend {error.message}</div>;
  }

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => <div>{product.name}</div>)
      ) : (
        <div>Kunde inte hitta några produkter..</div>
      )}
    </div>
  );
};

export default page;
