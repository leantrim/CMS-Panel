'use client';
import { Button } from '@/components/ui/button';
import { convertToTitleCase } from '@/lib/utils';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import React from 'react';
import { useForm } from 'react-hook-form';
import useProduct from '../../../products/components/useProduct';

type Props = {
  value: string | number;
  objectId: string | undefined;
  arrayName: string;
  title: string;
  route: API_ROUTES;
  largeField?: boolean;
  array: string[];
  index: number;
};

const ArrayFieldValue = (props: Props) => {
  const { updateProduct } = useProduct();
  const { array, index, objectId, arrayName, title, value, largeField } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const camelCasedTitle = convertToTitleCase(title);

  const onSubmit = async (data: any) => {
    const newValue = watch(arrayName);
    array[index] = watch(arrayName);
    const features = [...array];
    console.log(features, [array][index]);
    if (!objectId) return;
    updateProduct(objectId, { features }, arrayName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex text-center items-center gap-4">
        <label htmlFor="storeName" className="text-sm leading-6 text-gray-900">
          {camelCasedTitle}
        </label>
        <div
          className={`w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md`}
        >
          {largeField ? (
            <textarea
              {...register(arrayName, { required: true })}
              className="bg-white h-auto block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={value}
            />
          ) : (
            <input
              {...register(arrayName, { required: true })}
              className="bg-white h-auto block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={value}
            />
          )}
        </div>
        <Button
          className="border-primary shadow-sm hover:bg-primary hover:text-white bg-white disabled:bg-white"
          size={'sm'}
          disabled={!watch(arrayName) || watch(arrayName) === value}
          variant="outline"
        >
          Spara
        </Button>
      </div>
    </form>
  );
};

export default ArrayFieldValue;
