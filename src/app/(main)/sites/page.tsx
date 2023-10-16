import { Metadata } from 'next';
import Main from './components/main';
import { Suspense } from 'react';
import Loading from './loading';
import Skeleton from 'react-loading-skeleton';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from 'types/Routes';

export const metadata: Metadata = {
  title: 'Hemsidor | CMS',
  description: '...',
};

const Sites = async () => {
  const data = await getData(API_ROUTES.GET_SITES);
  return (
    <Suspense fallback={<Skeleton count={5} />}>
      <Main sites={data} />
    </Suspense>
  );
};

export default Sites;
