import jwtDecode from 'jwt-decode';
import http from './httpService';
import { postData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

const tokenKey = 'x-auth-token';

http.setAuthHeader(getJwt());

interface User {
  email: string;
  password: string;
}

async function login(user: User) {
  const jwt = await postData(API_ROUTES.AUTH, {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const userToken = localStorage.getItem(tokenKey) || '';
    const user = jwtDecode(userToken);
    return user;
  } catch (error) {
    return null;
  }
}

function getJwt() {
  if (typeof window !== 'undefined') {
    const key = localStorage.getItem(tokenKey);
    return key;
  }
}

const exportedObject = {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};

export default exportedObject;
