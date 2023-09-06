import Main from "./main";

const Sites = async () => {
  const data = await getData();
  return <Main forms={data} />;
};

async function getData() {
  const res = await fetch(`http://localhost:8000/api/forms`, {
    method: "GET",
    headers: {
      ["authorization"]: process.env.BACKEND_API_KEY!!,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default Sites;
