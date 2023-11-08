import { useState } from 'react';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import http from '@/services/httpService';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { cn } from '@/lib/utils';

export enum PRODUCT_TAB_MAP {
  mainsettings = 'mainsettings',
  variant = 'variants',
  images = 'images',
  blocks = 'blocks',
}

export const productTabMap = [
  { name: 'Inställningar', href: PRODUCT_TAB_MAP.mainsettings },
  { name: 'Varianter', href: PRODUCT_TAB_MAP.variant },
  { name: 'Blocks', href: PRODUCT_TAB_MAP.blocks },
  { name: 'Bilder', href: PRODUCT_TAB_MAP.images },
];

type Props = {
  productsList?: ProductType[];
};

const useProduct = (productsList?: ProductType[]) => {
  const [products, setProducts] = useState<ProductType[]>(productsList ?? []);

  const updateProduct = async (productId: string, data: any, title: string) => {
    try {
      const request = await http.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${API_ROUTES.ECOMMERCE_PRODUCTS}/${productId}`,
        data,
      );
      if (request.status === 200) {
        toast({
          variant: 'success',
          title: `Butiken updaterad!`,
          description: `Success${request.status}: ${title}`,
          duration: 3000,
        });
      } else {
        toast({
          variant: 'error',
          className: cn('text-lg'),
          title: 'Ops, något gick fel!',
          description: `ERROR:${request.status}: ${request.data}`,
          duration: 3000,
        });
      }
      return request;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({
          variant: 'error',
          title: 'Något gick fel',
          description: `Meddelande(${axiosError.response.status}):${axiosError.response.data}`,
          duration: 3000,
        });
        return null;
      }
    }
  };

  const handleDeleteProduct = async (id: string | undefined) => {
    try {
      const res = await http.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${API_ROUTES.ECOMMERCE_PRODUCTS}/${id}`);
      if (res.status > 199 && res.status < 300) {
        setProducts((products) => products.filter((product) => product._id !== id));
        toast({
          variant: 'success',
          title: 'Success!',
          description: `Meddelande${res.status}: ${res.data}`,
          // className: cn('toast-top'),
          duration: 3000,
        });
      } else {
        toast({
          variant: 'error',
          title: 'Något gick fel (Not in catch)',
          description: `Status (${res.status}: ${res.data})`,
          // className: cn('toast-top'),
          duration: 3000,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response)
        toast({
          variant: 'error',
          title: 'Något gick fel',
          description: `Meddelande(${axiosError.response.status}):${axiosError.response.data}`,
          // className: cn('toast-top'),
          duration: 3000,
        });
    }
  };
  const handleCopyProduct = async (productId: string | undefined) => {
    try {
      const res = await http.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${API_ROUTES.ECOMMERCE_PRODUCTS}/${productId}`,
      );
      console.log(res.data);
      if (res.status > 199 && res.status < 300) {
        setProducts((products) => [...products, res.data]);
        toast({
          variant: 'success',
          title: 'Success!',
          description: `Meddelande${res.status}: Produkten kopierad!`,
          // className: cn('toast-top'),
          duration: 3000,
        });
      } else {
        toast({
          variant: 'error',
          title: 'Något gick fel (Not in catch)',
          description: `Status (${res.status}: ${res.data})`,
          // className: cn('toast-top'),
          duration: 3000,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response)
        toast({
          variant: 'error',
          title: 'Något gick fel',
          description: `Meddelande(${axiosError.response.status}):${axiosError.response.data}`,
          // className: cn('toast-top'),
          duration: 3000,
        });
    }
  };

  return { products, handleDeleteProduct, handleCopyProduct, updateProduct };
};

export default useProduct;
