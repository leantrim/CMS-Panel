import Field from '@/Shared/Field';
import { WebsiteModel } from '@/types/WebsiteModel';
import React from 'react';
import ToggleContainerVisibility from '../common/ToggleContainerVisibility';
import { Container, HeadContainer } from './Styles';

type Props = {
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	webData: WebsiteModel;
};

const ContactInformation = (props: Props) => {
	const [showSettings, setShowSettings] = React.useState<boolean>(false);

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
				<h2>Kontakt information</h2>
				<ToggleContainerVisibility
					setShowSettings={setShowSettings}
					showSettings={showSettings}
				/>
			</HeadContainer>
			{showSettings && (
				<>
					<Field
						label='Telefonnummer:'
						type='text'
						valueType='url'
						update={update}
						webData={webData['url']}
					/>
					<Field
						label='Email'
						type='text'
						valueType='email'
						update={update}
						webData={webData['email']}
					/>
					<Field
						label='Address'
						type='text'
						valueType='address'
						update={update}
						webData={webData['address']}
					/>
				</>
			)}
		</Container>
	);
};

export default ContactInformation;
