import { Metadata } from 'next';
import Main from './components/main';
import { Suspense } from 'react';
import Loading from './loading';
import Skeleton from 'react-loading-skeleton';

export const metadata: Metadata = {
  title: 'CMS | Hemsidor',
  description: '...',
};

const Sites = async () => {
  const data = await getData();
  return (
    <Suspense fallback={<Skeleton count={5} />}>
      <Main sites={data} />
    </Suspense>
  );
};

async function getData() {
  const res = await fetch(`http://localhost:8000/api/sites`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      ['authorization']: process.env.BACKEND_API_KEY!!,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default Sites;
