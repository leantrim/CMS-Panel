import Main from '../components/main';

async function WebsiteConfigurator({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return <Main website={data} />;
}

async function getData(id: string) {
  const res = await fetch(`http://localhost:8000/api/sites/${id}`, {
    method: 'GET',
    headers: {
      ['authorization']: process.env.BACKEND_API_KEY!!,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default WebsiteConfigurator;
