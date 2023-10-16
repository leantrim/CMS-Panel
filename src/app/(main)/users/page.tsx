import { getData } from '@/lib/queryApi';
import { API_ROUTES } from 'types/Routes';
import { UserType } from 'types/UserType';

const Users = async () => {
  const data = await getData(API_ROUTES.GET_USERS);

  return <div>{data?.map((form: UserType, index: number) => <div key={index}>{form.email}</div>)}</div>;
};

export default Users;
