import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useState } from 'react';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import ArrayFieldValue from '../../../stores/Components/common/ArrayFieldValue';
import { Button } from '@/components/ui/button';
import useProduct from '../useProduct';

const ProductFeatures = ({ product }: { product: ProductType }) => {
  const { updateProduct } = useProduct();
  const [features, setFeatures] = useState(product.features || []);

  const createNewFeature = () => {
    setFeatures((state) => [...state, 'new value']);
  };
  const deleteFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
    updateProduct(product._id, { features: updatedFeatures }, 'Test');
  };

  return (
    <div className="flex-center flex-col items-center">
      <div className="flex justify-between w-full">
        <div className="heading4">Features</div>
        <Button onClick={() => createNewFeature()}>Lägg till</Button>
      </div>
      {features.map((item, index) => (
        <div className="flex bg-gray-200 rounded-lg p-2 m-2 border-sm shadow-lg gap-4 w-full" key={index}>
          <ArrayFieldValue
            value={item}
            objectId={product._id}
            arrayName={'features'}
            route={API_ROUTES.ECOMMERCE_PRODUCTS}
            title={''}
            array={features}
            index={index}
          />
          <Button onClick={() => deleteFeature(index)} size="sm" variant="danger">
            Ta bort
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;
