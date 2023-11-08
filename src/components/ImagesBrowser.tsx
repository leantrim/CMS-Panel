'use client';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import React from 'react';
import Modal2 from './common/Modal2';
import { MinioObjectType } from '@mediapartners/shared-types/types/panel';
import Image from 'next/image';
import SettingsLayout from './common/SettingsLayout';

type Props = {
  images: MinioObjectType[];
};

const ImagesBrowser = (props: Props) => {
  const { images } = props;
  return (
    <Modal2 open={false} setOpen={() => console.log} fullWidth>
      <div className="p-4">
        <SettingsLayout heading="Bilder" subHeading="Lista på alla bilder uppladdade">
          <div className="max-h-[90vh] max-w-[80vw] grid grid-flow-row grid-cols-6 gap-4 overflow-y-scroll">
            {images.map((image) => (
              <div className="h-fit" key={image.name}>
                <Image
                  alt="none"
                  src={`http://95.217.166.44:9000/mediapartners/${image.name}`}
                  width={146}
                  height={146}
                  className="border-2"
                />
              </div>
            ))}
          </div>
        </SettingsLayout>
      </div>
    </Modal2>
  );
};

const buildUrl = (name: string) => `http://95.217.166.44:9000/mediapartners/${name}`;

export default ImagesBrowser;
