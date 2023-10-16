import { Metadata } from 'next';
import Main from './main';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from 'types/Routes';

export const metadata: Metadata = {
  title: 'CMS | Forms',
  description: '...',
};

const Sites = async () => {
  const data = await getData(API_ROUTES.GET_FORMS);
  return <Main forms={data} />;
};

export default Sites;
