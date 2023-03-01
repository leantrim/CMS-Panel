import ToggleContainerVisibility from '@/components/common/ToggleContainerVisibility';
import Field from '@/Shared/Field';
import { WebsiteModel } from '@/types/WebsiteModel';
import React from 'react';
import { Container, HeadContainer } from '../Styles';
import { useRef } from 'react';
import ChatGpt from '@/components/chatgpt';

type Props = {
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	webData: WebsiteModel;
};

const AboutUs = (props: Props) => {
	const [showSettings, setShowSettings] = React.useState<boolean>(false);
	const messageInput = useRef<HTMLTextAreaElement>(null);

	const { update, webData } = props;
	return (
		<Container
			isActive={showSettings}
			style={{ cursor: !showSettings ? 'pointer' : 'default' }}
			onClick={() => {
				if (!showSettings) setShowSettings(true);
			}}
		>
			<HeadContainer>
				<h2>Om Oss</h2>
				<ToggleContainerVisibility
					setShowSettings={setShowSettings}
					showSettings={showSettings}
				/>
			</HeadContainer>
			{showSettings && (
				<>
					<Field
						label='En text om oss (lägg till <br /> för att skapa ny rad) HTML stöds'
						type='text'
						valueType='aboutUs'
						update={update}
						webData={webData['aboutUs']}
						large
						textInputArea={messageInput}
					/>
					<ChatGpt textInputArea={messageInput} />
				</>
			)}
		</Container>
	);
};

export default AboutUs;
