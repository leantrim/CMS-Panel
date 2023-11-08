import React from 'react';
import Images from '../../../../common/Images';
import { BlockType, ImageProp } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import useProduct from '../../../../useProduct';
import { useProductSelector } from '../../../../../redux/store';
import useBlocks from '../../useBlocks';

type ImageBlockProps = {
  block: BlockType;
};

const ImageBlock = (props: ImageBlockProps) => {
  const { block } = props;
  const { onUpdateBlock } = useBlocks();

  const onImageUpdate = (newImages: ImageProp[]) => {
    console.log('Images updated', newImages);

    const updatedBlock = { ...block, images: [...newImages] };

    onUpdateBlock(updatedBlock);
  };

  return (
    <div>
      <Images
        imagesProp={block.images}
        onImageUpdate={onImageUpdate}
        heading="Bilder"
        subHeading="Lista över bilder till blocket"
      />
    </div>
  );
};

export default ImageBlock;
