'use client';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React from 'react';
import Tabs from '@/components/common/Tabs';
import { useSearchParams } from 'next/navigation';
import { PRODUCT_TAB_MAP, productTabMap } from './useProduct';
import ProductImages from './ProductImages/ProductImages';
import ProductSettings from './ProductMainSettings/ProductSettings';
import Variants from './ProductMainSettings/Variants/Variants';
import Blocks from './ProductMainSettings/Blocks/Blocks';
import { useDispatch } from 'react-redux';
import { setProduct } from '../redux/slices/productSlice';

const ProductPage = ({ product }: { product: ProductType }) => {
  const searchParams = useSearchParams();
  const search: string = searchParams.get('tab') || 'main';
  const dispatch = useDispatch();
  dispatch(setProduct(product));

  const renderProductSettings = () => {
    switch (search) {
      case PRODUCT_TAB_MAP.mainsettings:
        return <ProductSettings />;

      case PRODUCT_TAB_MAP.images:
        return <ProductImages />;

      case PRODUCT_TAB_MAP.variant:
        return <Variants />;

      case PRODUCT_TAB_MAP.blocks:
        return <Blocks />;

      default:
        break;
    }
  };

  return (
    <div className="">
      <Tabs tabMap={productTabMap} />
      {renderProductSettings()}
    </div>
  );
};

export default ProductPage;
