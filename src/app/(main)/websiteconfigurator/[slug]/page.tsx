import Main from "../components/main";

async function WebsiteConfigurator({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  console.log(data);

  return <Main website={data} />;
}

export const dynamic = "force-dynamic";

async function getData(id: string) {
  const res = await fetch(`http://localhost:8000/api/sites/${id}`, {
    method: "GET",
    headers: {
      ["authorization"]: process.env.BACKEND_API_KEY!!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default WebsiteConfigurator;
