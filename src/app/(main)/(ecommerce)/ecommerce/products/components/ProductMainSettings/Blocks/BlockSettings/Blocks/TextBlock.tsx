import { Button } from '@/components/ui/button';
import { BlockType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useBlocks from '../../useBlocks';
import TitleBody from '../../../../common/TitleBody';

type Inputs = {
  title: string;
  body: string;
};

type TextBlockType = {
  block: BlockType;
};

const TextBlock = (props: TextBlockType) => {
  const { block } = props;
  const { onUpdateBlock } = useBlocks();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlockType>();
  const onTextSave: SubmitHandler<BlockType> = (data) => {
    const updatedBlock = { ...block, ...data };
    onUpdateBlock(updatedBlock);
  };

  return (
    <div className="w-full border-2 border-gray-50 p-4 shadow-sm">
      <TitleBody block={block} onTextSave={onTextSave} />
    </div>
  );
};

export default TextBlock;
