import React, { useState } from 'react';
import TextBlock from './TextBlock';
import { BlockType, ImageProp } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import Images from '../../../../common/Images';
import TitleBody from '../../../../common/TitleBody';

type ImageTextBlockProps = {
  block: BlockType;
};

const ImageTextBlock = (props: ImageTextBlockProps) => {
  const { block } = props;
  const [formData, setFormData] = useState<BlockType>(block);

  const onImageUpdate = (images: ImageProp[]) => {
    console.log(images);
    setFormData((state: BlockType) => {
      return {
        ...state,
        images: images,
      };
    });
  };

  return (
    <div>
      <Images onImageUpdate={onImageUpdate} heading="Bilder" subHeading="Lista över bilder" imagesProp={block.images} />
      <TitleBody block={block} setFormData={setFormData} />
    </div>
  );
};

export default ImageTextBlock;
