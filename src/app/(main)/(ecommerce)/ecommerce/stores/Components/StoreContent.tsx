import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';
import React from 'react';
import FieldValue from './common/FieldValue';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

type Props = {
  store: StoreType;
};

const StoreContent = (props: Props) => {
  const { store } = props;
  return (
    <div className="border rounded-2xl flex-center flex-col  justify-around">
      <span className="heading3 text-gradient">Innehåll</span>
      <div className="flex justify-around w-full">
        <div>
          <FieldValue
            value={store.name}
            objectId={store._id}
            title="Butiksnamn"
            route={API_ROUTES.ECOMMERCE_SITES}
            type={'text'}
            keyName="name"
          />
          <FieldValue
            value={store.url}
            objectId={store._id}
            title="URL"
            route={API_ROUTES.ECOMMERCE_SITES}
            type={'text'}
            keyName="url"
          />
        </div>
        <div>
          <FieldValue
            value={store.contactInfo.phone}
            objectId={store._id}
            title="Telefon Nummer"
            route={API_ROUTES.ECOMMERCE_SITES}
            type={'text'}
            keyName="contactInfo.phone"
          />
          <FieldValue
            value={store.contactInfo.email}
            objectId={store._id}
            keyName="contactInfo.email"
            title="Email"
            route={API_ROUTES.ECOMMERCE_SITES}
            type={'text'}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreContent;
