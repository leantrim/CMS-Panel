'use client';
import Field from '@/Shared/Field';
import { BodyText, WebsiteModel } from '@/types/WebsiteModel';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import AboutUs from './AboutUs';
import BodyContext from './Body';
import ContactInformation from './ContactInformation';
import MainSettings from './MainSettings';
import Services from './Services';

const ChatGpt = dynamic(() => import('../chatgpt'), {
	ssr: false,
});

const WebsiteConfigurator = () => {
	const [webData, setWebData] = React.useState<WebsiteModel>({
		metaTitle: '',
		url: '',
		description: '',
		primaryColor: '#fff',
		secondaryColor: '#fff',
		email: '',
		address: '',
		serviceDescription: '',
		aboutUs: '',
		bodyTexts: [
			{ title: '', text: '' },
			{ title: '', text: '' },
			{ title: '', text: '' },
		],
		services: [
			{
				name: '',
				text: '',
				metaDescription: '',
				imageUrl: '',
				secondaryDescription: '',
			},
		],
	});

	const addBodyText = () => {
		setWebData((prevWebData) => {
			const newBodyTexts = [...prevWebData.bodyTexts, { title: '', text: '' }];
			return { ...prevWebData, bodyTexts: newBodyTexts };
		});
	};

	const deleteBodyText = (index: number) => {
		setWebData((prevWebData) => {
			const newBodyTexts = prevWebData.bodyTexts.filter((_, i) => i !== index);
			return { ...prevWebData, bodyTexts: newBodyTexts };
		});
	};

	const addService = () => {
		setWebData((prevWebData) => {
			const newService = [
				...prevWebData.services,
				{
					name: '',
					text: '',
					metaDescription: '',
					imageUrl: '',
					secondaryDescription: '',
				},
			];
			return { ...prevWebData, services: newService };
		});
	};

	const deleteService = (index: number) => {
		setWebData((prevWebData) => {
			const newService = prevWebData.services.filter((_, i) => i !== index);
			return { ...prevWebData, services: newService };
		});
	};

	const updateBodyText = (
		index: number,
		key: keyof BodyText,
		value: string
	) => {
		const newBodyTexts = [...webData.bodyTexts];
		newBodyTexts[index][key] = value;
		setWebData((prevData) => ({
			...prevData,
			bodyTexts: newBodyTexts,
		}));
	};
	const updateService = (index: number, key: keyof Services, value: string) => {
		const newService = [...webData.services];
		newService[index][key] = value;
		setWebData((prevData) => ({
			...prevData,
			services: newService,
		}));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

	const update = (key: string, value: WebsiteModel[keyof WebsiteModel]) => {
		setWebData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	return (
		<Container>
			<H1>Hemsida Konfiguratorn</H1>
			<Form onSubmit={onSubmit}>
				<MainSettings update={update} webData={webData} />
				<AboutUs update={update} webData={webData} />
				<ContactInformation update={update} webData={webData} />
				<BodyContext
					update={update}
					webData={webData}
					updateBodyText={updateBodyText}
					addBodyText={addBodyText}
					deleteBodyText={deleteBodyText}
				/>
				<Services
					update={update}
					webData={webData}
					updateService={updateService}
					addBodyText={addService}
					deleteBodyText={deleteService}
				/>
				<Button type='submit'>Skapa</Button>
			</Form>
		</Container>
	);
};

const Button = styled.button`
	margin-top: 12px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	padding: 48px;
`;

const Container = styled.div``;

const H1 = styled.h1``;

export default WebsiteConfigurator;
