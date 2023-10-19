import { Metadata } from 'next';
import Main from './main';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

export const metadata: Metadata = {
  title: 'CMS | Forms',
  description: '...',
};

const Sites = async () => {
  const data = await getData(API_ROUTES.LANDING_PAGE_FORMS);
  return <Main forms={data} />;
};

export default Sites;
