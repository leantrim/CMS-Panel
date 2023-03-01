import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {
	const response = await openai.listModels();

	const data = JSON.stringify(response.data);

	return new Response(data);
}
