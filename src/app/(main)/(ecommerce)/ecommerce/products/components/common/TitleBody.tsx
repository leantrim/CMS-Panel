import { Button } from '@/components/ui/button';
import { BlockType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  block: BlockType;
  setFormData: (data: BlockType) => void;
};

const TitleBody = (props: Props) => {
  const { block, setFormData } = props;
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<BlockType>();

  const watchedFields = watch(); // watch all fields

  React.useEffect(() => {
    setFormData(watchedFields);
  }, [watchedFields, setFormData]);

  return (
    <form className="flex flex-col gap-8">
      <div>
        <label className="sub-heading">Title</label>
        <input
          {...register(`title`, { required: false })}
          className="input-field mt-4"
          defaultValue={block?.title}
          type={'text'}
          placeholder="Title"
        />
      </div>
      <div>
        <label className="sub-heading">Text</label>
        <textarea
          {...register(`text`, { required: true })}
          className="input-field min-h-[400px] mt-4"
          defaultValue={block?.title}
        />
      </div>
      <div className="w-full text-end">
        <Button type="submit" className="w-16 text-end">
          Spara
        </Button>
      </div>
    </form>
  );
};

export default TitleBody;
