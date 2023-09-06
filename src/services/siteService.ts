import { WebsiteModel } from "types/WebsiteModel";
import http from "./httpService";

const SECOND_URL = "sites";

export function getSites() {
  return http.get(`http://localhost:8000/api/sites`);
}

export function getSite(id: string) {
  return http.get(`http://localhost:8000/api/sites/${id}`);
}

export function newSite(data: WebsiteModel) {
  return http.post(`http://localhost:8000/api/sites/`, data);
}

export function updateSite(data: WebsiteModel) {
  return http.put(`http://localhost:8000/api/sites/`, data);
}

export function getForms() {
  return http.get(`http://localhost:8000/api/forms`);
}
