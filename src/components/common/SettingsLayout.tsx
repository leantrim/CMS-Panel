import { ProductType, ProductVariantType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React, { useState } from 'react';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { Button } from '@/components/ui/button';
import { useFieldArray, useForm } from 'react-hook-form';
import Heading from '@/components/common/Heading';

type Props = {
  children: React.ReactNode;
  onClickAdd?: () => void;
  heading: string;
  subHeading: string;
};

const SettingsLayout = (props: Props) => {
  return (
    <div className="w-full">
      <div className="flex justify-between w-full pb-4">
        <Heading heading={props.heading} subHeading={props.subHeading} />
        {props.onClickAdd && <Button onClick={props.onClickAdd}>Lägg till</Button>}
      </div>
      {props.children}
    </div>
  );
};

export default SettingsLayout;
