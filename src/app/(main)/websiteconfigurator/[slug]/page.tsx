import { Metadata } from 'next';
import Main from '../components/main';
import { getData } from '@/lib/queryApi';
import { API_ROUTES } from 'types/Routes';

export const metadata: Metadata = {
  title: 'CMS - Website Configurator',
  description: '...',
};

async function WebsiteConfigurator({ params }: { params: { slug: string } }) {
  const data = await getData(API_ROUTES.GET_SITES, params.slug, true);

  return <Main website={data} />;
}

export default WebsiteConfigurator;
