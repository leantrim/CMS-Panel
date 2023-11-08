'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn, convertToTitleCase } from '@/lib/utils';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import React from 'react';
import { useForm } from 'react-hook-form';
import http from '@/services/httpService';
import { AxiosError } from 'axios';
import useProduct from '../../../products/components/useProduct';

type Props = {
  value: string | number;
  objectId: string | undefined;
  keyName: string;
  title: string;
  route: API_ROUTES;
  largeField?: boolean;
  type: string | number;
  array?: string[];
  index?: number;
};

const FieldValue = (props: Props) => {
  const { toast } = useToast();
  const { updateProduct } = useProduct();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const camelCasedTitle = convertToTitleCase(props.title);

  const onSubmitTest = async (data: any) => {
    if (!props.objectId) return;
    console.log(Object.keys(props.value));
    if (props.array && props.index) {
      props.array[props.index] = watch(props.keyName);
      const features = [...props.array]; // Spread into an array, not an object
      if (!props.objectId) return;
      updateProduct(props.objectId, { features }, props.title); // Pass features as an object property
    } else {
      updateProduct(props.objectId, data, props.title);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const request = await http.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.route}/${props.objectId}`, data);
      if (request.status === 200) {
        toast({
          variant: 'success',
          title: 'Butiken updaterad!',
          description: `Ny ${props.title}: ${request.data}`,
          duration: 3000,
        });
      } else {
        toast({
          variant: 'error',
          className: cn('text-lg'),
          title: 'Ops, något gick fel!!',
          description: `ERROR:${request.status}: ${request.data}`,
          duration: 3000,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({
          variant: 'error',
          title: 'Något gick fel',
          description: `Meddelande(${axiosError.response.status}):${axiosError.response.data}`,
          duration: 3000,
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex text-center items-center gap-4 pb-4">
        <label htmlFor="storeName" className="text-sm leading-6 text-gray-900">
          {camelCasedTitle}
        </label>
        <div
          className={`w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md`}
        >
          {props.largeField ? (
            <textarea
              {...register(props.keyName, { required: true })}
              className="bg-white h-auto block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={props.value}
            />
          ) : (
            <input
              {...register(props.keyName, { required: true })}
              className="bg-white h-auto block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={props.value}
            />
          )}
        </div>
        <Button
          className="border-primary shadow-sm hover:bg-primary hover:text-white bg-white disabled:bg-white"
          size={'sm'}
          disabled={!watch(props.keyName) || watch(props.keyName) === props.value}
          variant="outline"
        >
          Spara
        </Button>
      </div>
    </form>
  );
};

export default FieldValue;
