import { useState } from 'react';
import { BlockType, ProductType, SECTION_TYPES } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import useProduct from '../../useProduct';
import { useDispatch } from 'react-redux';
import { setEditingBlock } from '../../../redux/slices/productSlice';
import { useProductSelector } from '../../../redux/store';

const useBlocks = () => {
  const { updateProduct } = useProduct();
  const product = useProductSelector((state) => state.productSlice.product);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [blocks, setBlocks] = useState<BlockType[]>(
    product?.blocks.filter((block) => block.order !== undefined).sort((a, b) => (a.order! > b.order! ? 1 : -1)) ?? [],
  );

  const toggleBlockVisibility = async (block: BlockType) => {
    const originalBlocks = [...blocks];
    const updatedBlocks = blocks.map((b) => (b._id === block._id ? { ...b, isVisible: !b.isVisible } : b));
    setBlocks(updatedBlocks);
    const status = await updateProduct(product._id, { blocks: updatedBlocks }, 'Block synlighet updaterad');
    if (status?.statusText !== 'OK') {
      setBlocks(originalBlocks);
    }
  };

  const onDeleteBlock = async (updatedBlock: BlockType[]) => {
    await updateProduct(product._id, { blocks: updatedBlock }, 'Updated blocks!');
  };

  const onUpdateBlock = async (updatedBlock: BlockType) => {
    const updatedBlocks = blocks.map((block) => {
      if (block._id === updatedBlock._id) {
        return { ...block, ...updatedBlock };
      }
      return block;
    });
    await updateProduct(product._id, { blocks: updatedBlocks }, 'Updated blocks!');
    // dispatch(setEditingBlock(''));
  };

  const addNewBlock = async (type: SECTION_TYPES) => {
    const newBlock: BlockType = {
      type,
      isVisible: true,
      order: blocks.length + 1,
    };
    const updatedBlocks = [...blocks, newBlock];
    setOpen(false);

    const status = await updateProduct(product._id, { blocks: updatedBlocks }, 'Ny block tillagd!');
    if (status?.statusText === 'OK') {
      setBlocks(status.data.blocks);
    }
  };

  return {
    addNewBlock,
    blocks,
    setBlocks,
    open,
    setOpen,
    toggleBlockVisibility,
    onUpdateBlock,
    onDeleteBlock,
  };
};

export default useBlocks;
