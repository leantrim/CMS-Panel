import { BodyText, WebsiteModel } from '@/types/WebsiteModel';
import React, { useEffect, useRef } from 'react';
import { Container, HeadContainer } from '../Styles';
import ToggleContainerVisibility from '../../common/ToggleContainerVisibility';
import styled from 'styled-components';
import LargeTextField from '@/components/WebsiteConfiguratior/Body/LargeTextField';
import SharedButton from '@/Shared/SharedButton';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatGpt from '@/components/chatgpt';

type Props = {
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	webData: WebsiteModel;
	updateBodyText: (index: number, key: keyof BodyText, value: string) => void;
	addBodyText: () => void;
	deleteBodyText: (index: number) => void;
};

const BodyContext = (props: Props) => {
	const { deleteBodyText, webData, updateBodyText, addBodyText } = props;
	const [showSettings, setShowSettings] = React.useState<boolean>(false);
	const messageInputRefs = webData.bodyTexts.map((element) =>
		React.createRef<HTMLTextAreaElement>()
	);

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
					<h2>Text Information</h2>
					<em>
						Här fyller vi in text som syns i sidan under headern för hjälp av
						SEO boost.
						<br />
						<strong>3 Sektioner är rekommenderat att ha</strong>
					</em>
				</div>
				<ToggleContainerVisibility
					setShowSettings={setShowSettings}
					showSettings={showSettings}
				/>
			</HeadContainer>
			{showSettings && (
				<>
					{webData.bodyTexts?.map((_, index) => (
						<TextSection key={index}>
							<HeaderContainer>
								<h4>sektion {index}</h4>
								<StyledIcon
									icon={faTrashCan}
									onClick={() => handleDeleteSection(index)}
								/>
							</HeaderContainer>
							<LargeTextField
								label='Title'
								type='text'
								valueType='title'
								updateBodyText={updateBodyText}
								webData={webData.bodyTexts[index]['title']}
								index={index}
							/>
							<LargeTextField
								label='Text'
								type='text'
								valueType='text'
								updateBodyText={updateBodyText}
								webData={webData.bodyTexts[index]['text']}
								index={index}
								large
								textInputArea={messageInputRefs[index]}
							/>
							<ChatGpt textInputArea={messageInputRefs[index]} />
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

export default BodyContext;
