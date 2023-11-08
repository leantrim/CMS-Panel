import { ProductDimensions, ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React from 'react';
import FieldValue from '../../../stores/Components/common/FieldValue';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

const Dimensions = ({ product }: { product: ProductType }) => {
  const renderField = (key: keyof ProductDimensions) => {
    switch (typeof product.dimensions[key]) {
      case 'string':
        return (
          <FieldValue
            key={key}
            value={product.dimensions[key] as string}
            objectId={product._id}
            keyName={`dimensions.[${key}]`}
            title={key}
            route={API_ROUTES.ECOMMERCE_PRODUCTS}
            type={'string'}
          />
        );
    }
  };
  return (
    <div className="leading-3 w-full">
      Dimensions
      <div>{Object.keys(product.dimensions).map((key) => renderField(key as keyof ProductDimensions))}</div>
    </div>
  );
};

export default Dimensions;
