import { Configuration, OpenAIApi } from 'openai';

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
		.catch(
			(err) =>
				`ChatGPT was unable to find an asnwer to your question. Please try again. ${console.error}`
		);
	return response;
};

export default query;
