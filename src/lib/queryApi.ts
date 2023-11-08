import { Configuration, OpenAIApi } from 'openai';
import http from '@/services/httpService';
import { API_ROUTES } from '@mediapartners/shared-types/types/Routes';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

const query = async (promt: string, model: string) => {
  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai
    .createCompletion({
      model,
      prompt: `${promt}`,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => `ChatGPT was unable to find an asnwer to your question. Please try again. ${console.error}`);
  return response;
};

export async function putData(mainRoute: string, data: any) {
  const fetchUrl = `${baseUrl}/${mainRoute}`;

  try {
    const res = await http.put(fetchUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: process.env.BACKEND_API_KEY!!,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function postData(mainRoute: API_ROUTES, data: any, subRoute?: string) {
  const apiPath = `/${mainRoute}`;
  const url = `${baseUrl}${apiPath}`;
  const fetchUrl = subRoute ? `${url}/${subRoute}` : url;

  console.log(fetchUrl);

  try {
    const res = await http.post(fetchUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        // ['authorization']: `Bearer ${process.env.BACKEND_API_KEY}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error('Failed to post data');
  }
}

export async function getData(mainRoute: API_ROUTES, subRoute?: string, noCache?: boolean) {
  const apiPath = `/${mainRoute}`;
  const url = `${baseUrl}${apiPath}`;
  const fetchUrl = subRoute ? `${url}/${subRoute}` : url;

  try {
    const res = await fetch(fetchUrl, {
      method: 'GET',
      cache: noCache ? 'no-store' : 'default',
      headers: {
        ['authorization']: `Bearer ${process.env.BACKEND_API_KEY}`,
      },
    });
    const data = await res.json();
    // console.log(res);
    return data;
  } catch (error) {
    throw error;
  }
}

export default query;
