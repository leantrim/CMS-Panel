import { UserType } from "types/UserType";

const Sites = async () => {
  const data = await getData();

  return (
    <div>
      {data?.map((form: UserType, index: number) => (
        <div key={index}>{form.email}</div>
      ))}
    </div>
  );
};

async function getData() {
  const res = await fetch("http://localhost:8000/api/user");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default Sites;
