import http from "./httpService";

const SECOND_URL = "user";

interface User {
  email: string;
  name: string;
  password: string;
  referalCode: string;
  userLogo?: String;
}

function register(user: User) {
  return http.post(
    `${process.env.DEVELOPMENT_DATABASE_URL}/api/${SECOND_URL}`,
    {
      email: user.email,
      name: user.name,
      password: user.password,
      referalCode: user.referalCode,
    }
  );
}

function getUsers() {
  return http.get(`${process.env.DEVELOPMENT_DATABASE_URL}/api/${SECOND_URL}/`);
}

function getUser() {
  return http.get(
    `${process.env.DEVELOPMENT_DATABASE_URL}/api/${SECOND_URL}/me`
  );
}

function getCustomUser(_id: string) {
  return http.get(
    `${process.env.DEVELOPMENT_DATABASE_URL}/api/${SECOND_URL}/${_id}`
  );
}

function updateUser(_id: string, user: User) {
  return http.put(
    `${process.env.DEVELOPMENT_DATABASE_URL}/api/${SECOND_URL}/${_id}`,
    user
  );
}

const exportObject = {
  register,
  getUser,
  getCustomUser,
  updateUser,
  getUsers,
};

export default exportObject;
