import { WebsiteModel } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';
import http from '../httpService';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

export function getSites() {
  return http.get(`http://localhost:8000/${API_ROUTES.LANDING_PAGE_SITES}`);
}

export function getSite(id: string) {
  return http.get(`http://localhost:8000/${API_ROUTES.LANDING_PAGE_SITES}/${id}`);
}

export function newSite(data: WebsiteModel) {
  return http.post(`http://localhost:8000/${API_ROUTES.LANDING_PAGE_SITES}/`, data);
}

export function updateSite(data: WebsiteModel) {
  return http.put(`http://localhost:8000/${API_ROUTES.LANDING_PAGE_SITES}/`, data);
}

export function getForms() {
  return http.get(`http://localhost:8000/${API_ROUTES.LANDING_PAGE_FORMS}`);
}
