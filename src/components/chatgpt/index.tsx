'use client';
import query from '@/lib/queryApi';
import SharedButton, { Button } from '@/Shared/SharedButton';
import { faRobot, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Modal from '../common/Modal';
interface ModelType {
	object: 'engine';
	id: string;
	ready: boolean;
	owner: string;
	permissions: null;
	created: string;
}

type Props = {
	textInputArea: React.RefObject<HTMLTextAreaElement>;
};

const ChatGpt = (props: Props) => {
	// const { setChatGptResponse, message } = props;
	const { textInputArea } = props;
	const messageInput = useRef<HTMLTextAreaElement>(null);
	const [response, setChatGptResponse] = useState<string>('');
	const [history, setHistory] = useState<
		{ text: string; isAiResponse: boolean }[]
	>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [models, setModels] = useState<any[]>([]);
	const [currentModel, setCurrentModel] = useState('text-davinci-003');
	const [isOpen, setIsOpen] = useState(false);

	const handleEnter = (
		e: React.KeyboardEvent<HTMLTextAreaElement> &
			React.FormEvent<HTMLFormElement>
	) => {
		if (e.key === 'Enter' && isLoading === false) {
			e.preventDefault();
			setIsLoading(true);
			handleSubmit();
		}
	};

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const handleSubmit = async () => {
		const message = messageInput.current?.value;
		if (!message) {
			return;
		}
		setChatGptResponse('');
		messageInput.current!.value = '';
		const newEntry = { question: message, response: '' };
		setHistory((history) => [
			...history,
			{ text: newEntry.question, isAiResponse: false },
			{ text: newEntry.response, isAiResponse: true },
		]);
		try {
			const res = await query(
				history.map((entry) => entry.text).join(' ') + message,
				currentModel
			);
			if (!res) return;
			const newEntry = {
				question: message,
				response: res,
			};
			setHistory((history) => [
				...history,
				{ text: newEntry.response, isAiResponse: true },
			]);
			setChatGptResponse(res);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddResponseToTextArea = (message: string) => {
		if (textInputArea.current) {
			textInputArea.current.value = message;
			textInputArea.current.focus();
			closeModal();
		}
	};

	const handleReset = () => {
		// localStorage.removeItem('response');
		setChatGptResponse('');
		setHistory([]);
	};
	const fetcher = async () => {
		const models = await (await fetch('/chatgpt/models')).json();
		setModels(models.data);
		const modelIndex = models.data.findIndex(
			(model: ModelType) => model.id === 'GPT-3'
		);
		setCurrentModel(models.data[modelIndex].id);
		return models;
	};

	useSWR('fetchingModels', fetcher);

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentModel(e.target.value);
	};

	// handleReset(); // rensa historik

	return (
		<div style={{ maxWidth: '400px' }}>
			<div onClick={openModal} style={{ cursor: 'pointer' }}>
				<FontAwesomeIcon
					icon={faRobot}
					style={{
						marginRight: '8px',
						fontSize: 24,
						color: '#9f3e3e',
					}}
				/>
				<span>ChatGPT</span>
			</div>

			<Modal isOpen={isOpen} onClose={closeModal}>
				<Container>
					<Button
						style={{ backgroundColor: '#9f3e3e', marginBottom: '12px' }}
						disabled={isLoading}
						onClick={handleReset}
					>
						Rensa
					</Button>
					<div style={{ overflowY: 'scroll' }}>
						<ChatHistory>
							{history.map(
								(msg, i) =>
									msg.text && (
										<ChatContainer key={i}>
											<FontAwesomeIcon
												icon={msg.isAiResponse ? faRobot : faUser}
												style={{
													marginRight: '8px',
													fontSize: 24,
													color: msg.isAiResponse ? '#9f3e3e' : '#404099',
												}}
											/>
											{msg.text}
											<ChatResponse>
												{msg.isAiResponse && (
													<AddResponseButton
														onClick={(
															e: React.MouseEvent<HTMLButtonElement>
														) => {
															e.preventDefault();
															handleAddResponseToTextArea(msg.text);
														}}
													>
														Välj Text
													</AddResponseButton>
												)}
											</ChatResponse>
										</ChatContainer>
									)
							)}
						</ChatHistory>

						<InputContainer>
							{isLoading && (
								<div style={{ textAlign: 'center', fontSize: 28 }}>
									<StyledSpinner icon={faSpinner} />
								</div>
							)}
							<StyledButton disabled={isLoading} onClick={handleSubmit}>
								Skicka
							</StyledButton>
							<TextArea
								name='Message'
								placeholder='Ställ en fråga'
								ref={messageInput}
								onKeyDown={handleEnter}
							/>
						</InputContainer>
					</div>
				</Container>
			</Modal>
		</div>
	);
};

const ChatResponse = styled.div`
	text-align: center;
	margin-top: 8px;
`;

const AddResponseButton = styled.button`
	background-color: #9f3e3e;
	border: none;
	padding: 12px;
	border: 1px solid #8d8383;
	border-radius: 8px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	:hover {
		background-color: #447719;
	}
`;

const ChatContainer = styled.div`
	margin-bottom: 12px;
	padding: 8px;
	background-color: #f5f5f5;
	border-radius: 8px;
`;
const ChatHistory = styled.div``;

const StyledButton = styled(Button)`
	position: relative;
	top: 35px;
	right: 12px;
	margin-top: 12px;
`;
const InputContainer = styled.div`
	text-align: right;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 38px;
	::placeholder {
		color: #000;
		padding-top: 6px;
		padding-left: 10px;
	}
	padding: 4px;
	padding-right: 42px;
`;

const Container = styled.div`
	width: 500px;
	max-height: 90%;
	margin: auto;
`;

const StyledSpinner = styled(FontAwesomeIcon)`
	animation-name: spin;
	animation-duration: 5000ms;
	animation-iteration-count: infinite;
	animation-timing-function: linear;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

export default ChatGpt;
