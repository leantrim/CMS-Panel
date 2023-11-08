import { BlockType, ProductType, SECTION_TYPES } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React from 'react';
import ImageBlock from './Blocks/ImageBlock';
import ImageTextBlock from './Blocks/ImageTextBlock';
import TextBlock from './Blocks/TextBlock';

type Props = {
  block: BlockType;
  product: ProductType;
};

const BlockSettings = (props: Props) => {
  const { block, product } = props;

  const renderBlockSettings = () => {
    switch (block.type) {
      case SECTION_TYPES.ImageBlock:
        return <ImageBlock block={block} />;
      case SECTION_TYPES.ImageTextBlock:
        return <ImageTextBlock block={block} />;
      case SECTION_TYPES.TextBlock:
        return <TextBlock block={block} />;

      default:
        break;
    }
  };

  return <div className="bg-white py-2 px-4">{renderBlockSettings()}</div>;
};

export default BlockSettings;
