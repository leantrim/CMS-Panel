import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import ProductList from './components/ProductList';

const page = async () => {
  let products: ProductType[] = [];

  try {
    products = await getData(API_ROUTES.ECOMMERCE_PRODUCTS);
  } catch (error: any) {
    return (
      <div className="text-sm text-pink">Något galet har hänt med anropp till Databasen/Backend {error.message}</div>
    );
  }

  return (
    <div className="">
      {products.length > 0 ? (
        <ProductList productsList={products} />
      ) : (
        <div>Kunde inte hitta några produkter..Skapa en ny:</div>
      )}
    </div>
  );
};

export default page;
