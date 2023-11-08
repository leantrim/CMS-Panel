import { getData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';
import { UserType } from '@mediapartners/shared-types/types/panel';

const Users = async () => {
  const data = await getData(API_ROUTES.PANEL_USERS);

  return <div>{data?.map((form: UserType, index: number) => <div key={index}>{form.email}</div>)}</div>;
};

export default Users;
