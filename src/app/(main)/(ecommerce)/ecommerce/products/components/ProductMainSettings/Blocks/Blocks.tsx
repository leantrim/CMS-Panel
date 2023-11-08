import SettingsLayout from '@/components/common/SettingsLayout';
import { BlockType, ProductType, SECTION_TYPES } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useRef, useState } from 'react';
import getBlockName from './lib/utils';
import AddNewBlock from './AddNewBlock';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import useBlocks from './useBlocks';
import clsx from 'clsx';
import BlockSettings from './BlockSettings/BlockSettings';
import { Button } from '@/components/ui/button';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomDragLayer from './lib/CustomDragLayer';
import useProduct from '../../useProduct';
import { useDispatch } from 'react-redux';
import { useProductSelector } from '../../../redux/store';
import { setEditingBlock } from '../../../redux/slices/productSlice';

const isBlockEditible = (type: SECTION_TYPES) => {
  if (type === SECTION_TYPES.ImageBlock || type === SECTION_TYPES.ImageTextBlock || type === SECTION_TYPES.TextBlock) {
    return true;
  }
  return false;
};

interface BlockProps {
  block: BlockType;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  deleteBlock: (block: BlockType) => void;
  toggleBlockVisibility: (block: BlockType) => void;
  product: ProductType;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Block: React.FC<BlockProps> = ({ block, index, moveBlock, toggleBlockVisibility, product, deleteBlock }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block', // Add this line
    item: { type: 'block', id: block._id, index, blockType: block.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => !isBlockEditing(block._id),
  });

  const editingBlock = useProductSelector((state) => state.productSlice.editingBlock);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: 'block',
    hover(item: DragItem, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveBlock(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const isBlockEditing = (blockId: string | undefined) => blockId === editingBlock;

  return (
    <div ref={(node) => node && drag(drop(node))} className="my-4">
      <div
        className={clsx(
          'flex py-2 justify-between w-full bg-white rounded-sm shadow-sm px-4 hover:shadow-lg',
          block.isVisible ? 'bg-white hover:shadow-lg cursor-move' : 'opacity-75',
        )}
      >
        <div className="flex-center gap-4">
          <div className={clsx('sub-heading', isBlockEditible(block.type) ? 'border-b-2 border-blue-400' : '')}>
            {getBlockName(block.type)}
          </div>
          {isBlockEditible(block.type) && (
            <Button
              variant={isBlockEditing(block._id) ? 'default' : 'outline'}
              size={'extraSmall'}
              className="p-2"
              onClick={() =>
                isBlockEditing(block._id) ? dispatch(setEditingBlock('')) : dispatch(setEditingBlock(block._id!!))
              }
            >
              {isBlockEditing(block._id) ? 'Stäng' : 'Redigera'}
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <>
            <Switch
              className="bg-gray-500 "
              id={`active-${block._id}`}
              checked={block.isVisible}
              onCheckedChange={() => toggleBlockVisibility(block)}
            />
            <Label htmlFor={`active-${block._id}`} className="">
              Synlig
            </Label>
            <Button variant={'danger'} size={'extraSmall'} onClick={() => deleteBlock(block)}>
              Ta bort
            </Button>
          </>
        </div>
      </div>
      {editingBlock === block._id && <BlockSettings block={block} product={product} />}
    </div>
  );
};

const Blocks = () => {
  const product = useProductSelector((state) => state.productSlice.product);
  const { addNewBlock, blocks, open, setOpen, toggleBlockVisibility, setBlocks, onDeleteBlock } = useBlocks();
  const { updateProduct } = useProduct();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const deleteBlock = (block: BlockType) => {
    const newBlocks = [...blocks.filter((object) => object._id !== block._id)];
    setBlocks(newBlocks);
    onDeleteBlock(newBlocks);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const draggedBlock = { ...newBlocks[fromIndex] };
    const targetBlock = { ...newBlocks[toIndex] };
    if (fromIndex === toIndex) {
      return;
    }

    const tempOrder = draggedBlock.order;
    draggedBlock.order = targetBlock.order;
    targetBlock.order = tempOrder;

    // Replace the original objects with the modified copies
    newBlocks[fromIndex] = draggedBlock;
    newBlocks[toIndex] = targetBlock;

    newBlocks.sort((a, b) => (a.order!! > b.order!! ? 1 : -1));

    setBlocks(newBlocks);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => updateProduct(product._id, { blocks: newBlocks }, 'Order updaterad'), 1500);
  };

  return (
    <SettingsLayout
      heading="Produkt Block"
      subHeading="En lista på alla produkt block i produkt sidan"
      onClickAdd={() => setOpen(true)}
    >
      <DndProvider backend={HTML5Backend}>
        <CustomDragLayer />
        <div className="bg-gray-50 p-4 shadow-md rounded-md">
          {blocks.map((block, index) => (
            <Block
              key={block._id}
              index={index}
              moveBlock={moveBlock}
              block={block}
              toggleBlockVisibility={toggleBlockVisibility}
              product={product}
              deleteBlock={deleteBlock}
            />
          ))}
        </div>
      </DndProvider>
      <AddNewBlock open={open} setOpen={setOpen} onAddNewBlock={addNewBlock} />
    </SettingsLayout>
  );
};

export default Blocks;
