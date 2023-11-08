import { handleUpload } from '@/app/(main)/(landingpages)/landingpages/websiteconfigurator/actions/uploadAction';
import { Button } from '@/components/ui/button';
import { uploadFile } from '@/services/fileService';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

type Props = {
  product: ProductType;
  image: {
    alt: string;
    url: string;
  };
  onImageUploaded(url: string, alt?: string): void;
  alt?: boolean;
  imageSettings: {
    width: number;
    height: number;
  };
};

const UploadImage = (props: Props) => {
  const { imageSettings } = props;
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    try {
      const res = await uploadFile(file);
      if (res?.status === 200) {
        toast({
          variant: 'success',
          title: 'Bild uppladdad!',
          description: `uppladdad: ${res.data.message}`,
          duration: 3000,
        });
        props.onImageUploaded(res.data.message, watch('alt'));
      } else {
        toast({
          variant: 'error',
          title: 'Något gick fel..',
          description: `Fel(${res?.status}): ${res?.data.message}`,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Något gick fel..',
        description: `Fel(BACKEND): ${error}`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <div className="flex-col rounded-lg border border-dashed border-gray-900/25 px-6 justify-center items-center">
        <label
          htmlFor="cover-photo"
          className="block text-xl text-center pt-4 font-medium leading-6 text-gray-900 sub-heading"
        >
          Cover photo
        </label>
        <div className="text-center py-4 self-center flex-center flex-col">
          {props.image?.url || file ? (
            <Image
              src={(file && URL.createObjectURL(file)) || props.image?.url}
              alt={props.image?.alt}
              width={imageSettings.width}
              height={imageSettings.height}
              className="object-center pb-4 h-auto"
              style={{ width: 'auto' }}
            />
          ) : (
            <FontAwesomeIcon icon={faImage} className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          )}
          <div className="flex flex-col text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mr-1"
            >
              <span>Select image</span>
              <input id="file-upload" name="file-upload" className="sr-only" type="file" onChange={handleFileChange} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          {props.alt && (
            <div className="flex flex-col border p-2 mt-4 rounded-lg bg-gray-50 shadow-sm w-2/4">
              <label htmlFor="storeName" className="text-sm font-semibold leading-6 normal-text pb-2">
                Image Alt
              </label>
              <input
                {...register('alt')}
                className="bg-white text-sm border text-center w-full"
                defaultValue={props.image?.alt}
              />
            </div>
          )}
          <Button
            onClick={() => handleSubmit()}
            variant="outline"
            disabled={(props.alt && !watch('alt')) || !file}
            className="mt-4"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
