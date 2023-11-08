import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import FieldValue from '../../../stores/Components/common/FieldValue';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import UploadImage from '../ProductImages/UploadImage';
import Dimensions from './Dimensions';
import ProductFeatures from './ProductFeatures';
import Variants from './Variants/Variants';
import useProduct from '../useProduct';
import Heading from '@/components/common/Heading';
import { useProductSelector } from '../../redux/store';

const imageSettings = {
  width: 50,
  height: 50,
};

const ProductSettings = () => {
  const product = useProductSelector((state) => state.productSlice.product);
  const sortedKeys = Object.keys(product).filter((key) => key !== '_id' && key !== '__v');
  const { updateProduct } = useProduct();

  const renderField = (key: keyof ProductType) => {
    switch (typeof product[key]) {
      case 'string':
        return (
          <FieldValue
            key={key}
            value={product[key] as string}
            objectId={product._id}
            keyName={key}
            title={key}
            route={API_ROUTES.ECOMMERCE_PRODUCTS}
            type={'string'}
            largeField={key === 'description'}
          />
        );
      case 'number':
        return (
          <FieldValue
            key={key}
            value={product[key] as string}
            objectId={product._id}
            keyName={key}
            title={key}
            route={API_ROUTES.ECOMMERCE_PRODUCTS}
            type={'number'}
          />
        );
    }
  };

  const onImageUploaded = (url: string, altText?: string) => {
    const alt = altText ?? product.mainImage.alt;
    updateProduct(product._id, { mainImage: { url, alt } }, 'Huvudbild updaterad');
  };

  return (
    <div>
      <div className="flex-column mb-10">
        <Heading heading="Produkt inställningar" subHeading="Huvudinställningar för produkt" />
      </div>
      <div className="gap-4 flex-col flex-center">
        <UploadImage
          onImageUploaded={(url) => onImageUploaded(url)}
          product={product}
          image={product.mainImage}
          alt
          imageSettings={imageSettings}
        />
        <div className="flex justify-between w-full gap-8">
          <div className="flex flex-col">{sortedKeys.map((key) => renderField(key as keyof ProductType))}</div>
          <Dimensions product={product} />
        </div>
        <ProductFeatures product={product} />
      </div>
    </div>
  );
};

export default ProductSettings;
