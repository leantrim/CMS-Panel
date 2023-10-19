'use server';

import { postData } from '@/lib/queryApi';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

export async function handleUpload(file: File) {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    const data = await postData(API_ROUTES.UPLOAD, formData);

    if (data.success) {
      return { imageUrl: data.message, error: '' };
    } else {
      return { error: data.message };
    }
  } else {
    throw new Error('No file selected');
  }
}
