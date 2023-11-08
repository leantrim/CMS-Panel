import React, { Suspense } from 'react';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { Button } from '@/components/ui/button';
import StoreList from './Components/StoreList';
import SettingsLayout from '@/components/common/SettingsLayout';

export const dynamic = `force-dynamic`;

const page = async () => {
  const stores = await getData(API_ROUTES.ECOMMERCE_SITES);
  return (
    <SettingsLayout heading="Butiker" subHeading="En lista på alla e-handels butiker">
      <Suspense fallback={<div>Loading stores...</div>}>
        <StoreList stores={stores} />
      </Suspense>
    </SettingsLayout>
  );
};

export default page;
