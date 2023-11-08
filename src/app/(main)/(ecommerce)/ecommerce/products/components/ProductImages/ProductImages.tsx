import { ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useState } from 'react';
import UploadImage from './UploadImage';
import useProduct from '../useProduct';
import SettingsLayout from '@/components/common/SettingsLayout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import Modal2 from '@/components/common/Modal2';
import { useProductSelector } from '../../redux/store';

const initialImageValue = {
  alt: '',
  url: '',
};

const imageSettings = {
  width: 50,
  height: 50,
};

const ProductImages = () => {
  const { updateProduct } = useProduct();
  const product = useProductSelector((state) => state.productSlice.product);
  const [images, setImages] = useState(product.images || []);
  const [open, setOpen] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(-1);

  const onImageUploaded = (url: string, alt: string) => {
    const updatedImages = [...images, { url, alt }];
    setImages(updatedImages);
    updateProduct(product._id, { images: [...updatedImages] }, 'Bild borttagen!');
  };

  const onImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    updateProduct(product._id, { images: [...updatedImages] }, 'Bild updaterad');
    setImages(updatedImages);
  };

  const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    setDraggingIndex(index);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const updatedImages = [...images];
    const draggedImage = updatedImages[draggingIndex];
    updatedImages.splice(draggingIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    setImages(updatedImages);
    setDraggingIndex(-1);
    updateProduct(product._id, { images: [...updatedImages] }, 'Ordningen updaterad!');
  };

  return (
    <SettingsLayout heading="Produkt Bilder" subHeading="En lista över produkt bilder" onClickAdd={() => setOpen(true)}>
      <div className="grid grid-cols-6 bg-gray-50 pt-2 pb-8 rounded-lg shadow-sm">
        {images.map((image, index) => (
          <div
            key={image.url}
            draggable
            onDragStart={handleDragStart(index)}
            onDrop={handleDrop(index)}
            onDragOver={handleDragOver}
            className="border-2 border-gray-300 rounded-lg p-2 m-2 cursor-move hover:shadow-lg transition-shadow duration-200"
          >
            <Image
              alt={image.alt}
              src={image.url}
              width={175}
              height={145}
              className="group-hover:opacity-50 h-full w-full cursor-move object-fill "
              style={{ width: 'auto' }}
              priority
            />
            <div className="flex-center">
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="lg"
                className="pt-4 cursor-pointer hover:text-red-500 text-center"
                onClick={() => onImageDelete(index)}
              />
            </div>
          </div>
        ))}
        <Modal2 open={open} setOpen={setOpen}>
          <UploadImage
            image={initialImageValue}
            onImageUploaded={(url, alt) => {
              onImageUploaded(url, alt!!);
              setOpen(false);
            }}
            product={product}
            alt
            imageSettings={imageSettings}
          />
        </Modal2>
      </div>
    </SettingsLayout>
  );
};

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export default ProductImages;
