import Main from './components/main';

const Sites = async () => {
  const data = await getData();
  return <Main sites={data} />;
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
