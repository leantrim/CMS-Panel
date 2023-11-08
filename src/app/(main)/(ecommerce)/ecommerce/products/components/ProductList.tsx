'use client';
import { PAGE_ROUTES } from '@/PageRoutes';
import { Button } from '@/components/ui/button';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import Link from 'next/link';
import useProduct from './useProduct';
import Heading from '@/components/common/Heading';
import Image from 'next/image';
import SettingsLayout from '@/components/common/SettingsLayout';

const ProductList = ({ productsList }: { productsList: ProductType[] }) => {
  const { products, handleDeleteProduct, handleCopyProduct } = useProduct(productsList);
  return (
    <SettingsLayout heading="Produkter" subHeading="En lista på produkter">
      <table className="w-full text-center normal-text mt-5">
        <thead className="border-gray-500">
          <tr>
            <th></th>
            <th>Produkt</th>
            <th>Varianter</th>
            <th>Header 2</th>
            <th>Header 3</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border pb-2">
              <td>
                <Image alt={product.mainImage.alt} src={product.mainImage.url} width={95} height={75} />
              </td>
              <td>{product.name}</td>
              <td>
                {product.variants.map((variant) => (
                  <span key={variant._id} className="bg-gray-300 mx-1 p-1 px-2 shadow-md rounded-xl text-sm">
                    {variant.type}
                  </span>
                ))}
              </td>
              <td>Data 2</td>
              <td>Data 3</td>
              <td>
                <Link
                  className="text-blue-500 font-semibold hover:cursor-pointer hover:text-blue-700"
                  href={`${PAGE_ROUTES.products}/${product._id}`}
                >
                  Redigera
                </Link>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                  Ta bort
                </Button>
              </td>
              <td>
                <Button variant="outline" size="sm" onClick={() => handleCopyProduct(product._id)}>
                  Kopiera
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SettingsLayout>
  );
};

export default ProductList;
