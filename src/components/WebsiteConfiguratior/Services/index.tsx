import { BodyText, Services, WebsiteModel } from '@/types/WebsiteModel';
import React, { useEffect } from 'react';
import { Container, HeadContainer } from '../Styles';
import ToggleContainerVisibility from '../../common/ToggleContainerVisibility';
import styled from 'styled-components';
import SharedButton from '@/Shared/SharedButton';
import {
	faTrashCan,
	faCheckCircle,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LargeTextField from './LargeTextField';
import Field from '@/Shared/Field';

type Props = {
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	webData: WebsiteModel;
	updateService: (index: number, key: keyof Services, value: string) => void;
	addBodyText: () => void;
	deleteBodyText: (index: number) => void;
};

const Services = (props: Props) => {
	const { deleteBodyText, webData, updateService, addBodyText, update } = props;
	const [showSettings, setShowSettings] = React.useState<boolean>(false);

	const handleClickAddSection = () => {
		addBodyText();
	};

	const handleDeleteSection = (index: number) => {
		deleteBodyText(index);
	};

	return (
		<Container
			isActive={showSettings}
			style={{ cursor: !showSettings ? 'pointer' : 'default' }}
			onClick={() => {
				if (!showSettings) setShowSettings(true);
			}}
		>
			<HeadContainer>
				<div>
					<h2>Tjänster</h2>
					<em>Tjänster hemsidan erjuder.</em>
				</div>
				<ToggleContainerVisibility
					setShowSettings={setShowSettings}
					showSettings={showSettings}
				/>
			</HeadContainer>
			{showSettings && (
				<>
					<Field
						label='Meta beskrivning som summerar tjänsterna (max 160 tecken)'
						type='text'
						valueType='url'
						update={update}
						webData={webData['url']}
						wordCounter
					/>
					{webData.services?.map((service, index) => (
						<TextSection key={index}>
							<HeaderContainer>
								<h4>Service {service.name}</h4>
								<StyledIcon
									icon={faTrashCan}
									onClick={() => handleDeleteSection(index)}
								/>
							</HeaderContainer>
							<LargeTextField
								label='Namn'
								type='text'
								valueType='name'
								updateServices={updateService}
								webData={webData.services[index]['name']}
								index={index}
							/>
							<LargeTextField
								label='Bild Länk'
								type='text'
								valueType='imageUrl'
								updateServices={updateService}
								webData={webData.services[index]['imageUrl']}
								index={index}
							/>
							<LargeTextField
								label='Text (visas i huvudsidan där vi listar våra tjänster)'
								type='text'
								valueType='text'
								updateServices={updateService}
								webData={webData.services[index]['text']}
								index={index}
								large
							/>
							<LargeTextField
								label='Sekundär Text (visas på våra tjänster sidan där vi listar alla våra tjänster)'
								type='text'
								valueType='secondaryDescription'
								updateServices={updateService}
								webData={webData.services[index]['secondaryDescription']}
								index={index}
								large
							/>
						</TextSection>
					))}
					<SharedButton
						handleClick={handleClickAddSection}
						label='Skapa ny sektion'
					/>
				</>
			)}
		</Container>
	);
};

const StyledIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	:hover {
		color: red;
	}
`;

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TextSection = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	padding: 24px;
	background-color: #f5f5f5;
`;

export default Services;
