import Modal2 from '@/components/common/Modal2';
import { BlockType, SECTION_TYPES } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useState } from 'react';
import getBlockName from './lib/utils';
import { Button } from '@/components/ui/button';
import { classNames } from '@/lib/utils';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onAddNewBlock: (block: SECTION_TYPES) => void;
};

const AddNewBlock = (props: Props) => {
  const { open, setOpen } = props;
  const [selectedValue, setSelectedValue] = useState<SECTION_TYPES>(SECTION_TYPES.ImageTextBlock);

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex-center flex-col py-4 bg-gray-50">
        <span className="sub-heading">Välj ett block att skapa</span>
        <div className=" grid-cols-2 grid gap-2">
          {Object.values(SECTION_TYPES).map((value) => (
            <div
              onClick={() => setSelectedValue(value)}
              key={value}
              className={classNames(
                'ring-primary',
                'hover:cursor-pointer hover:bg-primary hover:text-white shadow-sm p-2 my-2',
                selectedValue === value ? 'border-2 border-primary' : `border-2 border-gray-100`,
              )}
            >
              {getBlockName(value)}
            </div>
          ))}
        </div>
        <div>
          Valt block: <span className="font-semibold">{getBlockName(selectedValue!!)}</span>
        </div>
        {selectedValue && (
          <Button className="my-4" onClick={() => props.onAddNewBlock(selectedValue)}>
            Skapa
          </Button>
        )}
      </div>
    </Modal2>
  );
};

export default AddNewBlock;
