import { WebsiteModel } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';
import http from './httpService';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;

export function uploadFile(file: File) {
  if (!SITE_URL) {
    throw new Error('SITE_URL is not defined');
  }
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('siteUrl', SITE_URL);

    return http.post(`http://localhost:8000/${API_ROUTES.UPLOAD}`, formData);
  }
}
