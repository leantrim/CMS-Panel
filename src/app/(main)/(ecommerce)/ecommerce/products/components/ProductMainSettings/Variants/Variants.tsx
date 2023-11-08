import { ProductType, ProductVariantType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import useProduct from '../../useProduct';
import UploadImage from '../../ProductImages/UploadImage';
import { useFieldArray, useForm } from 'react-hook-form';
import SettingsLayout from '@/components/common/SettingsLayout';
import Image from 'next/image';
import Modal2 from '@/components/common/Modal2';
import { useProductSelector } from '../../../redux/store';

const PLACE_HOLDER_IMAGE = 'http://95.217.166.44:9000/mediapartners/cover.webp';

interface FormValues {
  variants: ProductVariantType[];
}

const initialVariant: ProductVariantType = {
  image: {
    alt: 'initial alt',
    url: PLACE_HOLDER_IMAGE,
  },
  stock: 0,
  type: 'Type',
  color: 'rgb(209, 180, 180)',
};

const imageSettings = {
  width: 50,
  height: 50,
};

const initialImageValue = {
  alt: '',
  url: '',
};

const Variants = () => {
  const { updateProduct } = useProduct();
  const product = useProductSelector((state) => state.productSlice.product);
  const [variants, setVariants] = useState(product.variants || []);
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const { control, register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { variants: variants || [] },
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: 'variants',
  });

  const createNewFeature = () => {
    const newVariants = [...variants, initialVariant];
    append(initialVariant);
    setVariants(newVariants);
    updateProduct(product._id, { variants: newVariants }, 'Ny variant tillagd');
  };

  const deleteFeature = (index: number) => {
    const updatedFeatures = [...variants];
    updatedFeatures.splice(index, 1);
    setVariants(updatedFeatures);
    remove(index);
    updateProduct(product._id, { variants: updatedFeatures }, 'Ny variant tillagd');
  };

  const onImageUploaded = (url: string, alt: string, index: number) => {
    const updatedFeatures = [...variants];
    updatedFeatures[index] = { ...updatedFeatures[index], image: { alt, url } };
    setVariants(updatedFeatures);
    updateProduct(product._id, { variants: updatedFeatures }, 'Ny variant tillagd');
  };

  const onSubmit = (data: any) => {
    const updatedVariants = data.variants.map((variant: any) => ({
      ...variant,
      stock: parseInt(variant.stock),
    }));
    setVariants(updatedVariants);
    updateProduct(product._id, { variants: updatedVariants }, 'Ny variant uppdaterad');
  };

  return (
    <SettingsLayout heading="Varianter" subHeading="En lista på varianter" onClickAdd={createNewFeature}>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {fields.map((field, index) => (
            <div className="rounded-lg border-sm shadow-sm border-2 p-2" key={field.id}>
              <div className="flex flex-col gap-4 w-full md:flex-row">
                <div className={`gap-4 w-full flex flex-col rounded-md `}>
                  <div className="w-full">
                    <label className="input-label">Variant namn</label>
                    <input
                      {...register(`variants.${index}.type`, { required: true })}
                      className="input-field"
                      defaultValue={field.type}
                      type={'text'}
                    />
                  </div>
                  <div className="w-full">
                    <label className="input-label">Lager saldo</label>
                    <input
                      {...register(`variants.${index}.stock`, { required: true })}
                      defaultValue={field.stock}
                      className="input-field"
                      type={'number'}
                    />
                  </div>
                  <div className="w-full">
                    <label className="input-label">Bild alt</label>
                    <input
                      {...register(`variants.${index}.image.alt`, { required: true })}
                      defaultValue={field.image?.alt}
                      className="input-field"
                      type={'text'}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label className="input-label">Färg</label>
                      <input
                        {...register(`variants.${index}.color`, { required: true })}
                        type="color"
                        defaultValue={field.color || watch(`variants.${index}.color`)}
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="flex-center flex-column gap-2">
                      <Image width={50} height={50} alt={field.image.alt} src={field.image.url} />
                      <Button
                        className=""
                        size={'sm'}
                        variant={'outline'}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedVariant(index);
                          setOpen(true);
                        }}
                      >
                        Ladda upp ny
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-center">
                <Button onClick={() => deleteFeature(index)} size="sm" variant="danger" className="text-end">
                  Ta bort
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-center pt-6">
          <Button
            className="border-primary shadow-sm hover:bg-primary hover:text-white bg-white disabled:bg-white"
            size={'lg'}
            variant="outline"
            type="submit"
          >
            Spara
          </Button>
        </div>
      </form>
      <Modal2 open={open} setOpen={setOpen}>
        <UploadImage
          image={initialImageValue}
          onImageUploaded={(url, alt) => {
            onImageUploaded(url, alt!!, selectedVariant);
          }}
          product={product}
          alt
          imageSettings={imageSettings}
        />
      </Modal2>
    </SettingsLayout>
  );
};

export default Variants;
