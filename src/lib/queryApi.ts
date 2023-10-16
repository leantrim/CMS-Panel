import { Configuration, OpenAIApi } from 'openai';
import { API_ROUTES } from 'types/Routes';
import http from '@/services/httpService';

const environment = process.env.NODE_ENV;
const productionUrl = process.env.PRODUCTION_DATABASE_URL || process.env.NEXT_PUBLIC_PRODUCTION_DATABASE_URL;
const developmentUrl = process.env.DEVELOPMENT_DATABASE_URL || process.env.NEXT_PUBLIC_DEVELOPMENT_DATABASE_URL;
const baseUrl = environment === 'production' ? productionUrl : developmentUrl;

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

export async function putData(mainRoute: API_ROUTES, data: any, subRoute?: string) {
  const apiPath = `/api/${mainRoute}`;
  const url = `${baseUrl}${apiPath}`;
  const fetchUrl = subRoute ? `${url}/${subRoute}` : url;

  try {
    const res = await http.put(fetchUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: process.env.BACKEND_API_KEY!!,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
}

export async function postData(mainRoute: API_ROUTES, data: any, subRoute?: string) {
  const apiPath = `/api/${mainRoute}`;
  const url = `${baseUrl}${apiPath}`;
  const fetchUrl = subRoute ? `${url}/${subRoute}` : url;

  console.log(fetchUrl);

  try {
    const res = await http.post(fetchUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: process.env.BACKEND_API_KEY!!,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error('Failed to post data');
  }
}

export async function getData(mainRoute: API_ROUTES, subRoute?: string, noCache?: boolean) {
  const apiPath = `/api/${mainRoute}`;
  const url = `${baseUrl}${apiPath}`;
  const fetchUrl = subRoute ? `${url}/${subRoute}` : url;

  const res = await fetch(fetchUrl, {
    method: 'GET',
    cache: noCache ? 'no-store' : 'default',
    headers: {
      ['authorization']: process.env.BACKEND_API_KEY!!,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default query;
