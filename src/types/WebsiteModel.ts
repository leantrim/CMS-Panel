export type BodyText = {
	title: string;
	text: string;
};
export type Services = {
	name: string;
	metaDescription: string;
	text: string;
	imageUrl: string;
	secondaryDescription: string;
};

export type WebsiteModel = {
	metaTitle: string;
	url: string;
	description: string;
	primaryColor: string;
	secondaryColor: string;
	email: string;
	address: string;
	serviceDescription: string;
	aboutUs: string;
	bodyTexts: BodyText[];
	services: Services[];
};
