import Field from '@/Shared/Field';
import { WebsiteModel } from '@/types/WebsiteModel';
import dynamic from 'next/dynamic';
import React from 'react';
import { Container, HeadContainer } from './Styles';
import ToggleContainerVisibility from '../common/ToggleContainerVisibility';

const ColorPicker = dynamic(() => import('../common/ColorPicker'), {
	ssr: false,
});

type Props = {
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	webData: WebsiteModel;
};

const MainSettings = (props: Props) => {
	const { update, webData } = props;
	const [showSettings, setShowSettings] = React.useState<boolean>(true);

	return (
		<Container
			isActive={showSettings}
			style={{ cursor: !showSettings ? 'pointer' : 'default' }}
			onClick={() => {
				if (!showSettings) setShowSettings(true);
			}}
		>
			<HeadContainer>
				<h2>Huvudinställningar</h2>
				<ToggleContainerVisibility
					setShowSettings={setShowSettings}
					showSettings={showSettings}
				/>
			</HeadContainer>
			{showSettings && (
				<>
					<Field
						label='Hemsida URL (exempel.se):'
						type='text'
						valueType='url'
						update={update}
						webData={webData['url']}
					/>
					<Field
						label='Meta title (max 60 tecken):'
						type='text'
						valueType='metaTitle'
						update={update}
						webData={webData['metaTitle']}
						wordCounter
					/>
					<Field
						label='Meta Beskrivning (max 160 tecken):'
						type='text'
						valueType='description'
						update={update}
						webData={webData['description']}
						wordCounter
					/>
					<ColorPicker
						title='Primär färg'
						valueType='primaryColor'
						update={update}
						webData={webData}
					/>
					<ColorPicker
						title='Sekundär färg'
						valueType='secondaryColor'
						update={update}
						webData={webData}
					/>
				</>
			)}
		</Container>
	);
};

export default MainSettings;
