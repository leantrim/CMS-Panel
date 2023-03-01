import { BodyText, Services } from '@/types/WebsiteModel';
import React from 'react';
import styled from 'styled-components';

type Props = {
	label: string;
	type: string;
	updateBodyText: (index: number, key: keyof BodyText, value: string) => void;
	valueType: keyof BodyText;
	webData: string;
	wordCounter?: boolean;
	index: number;
	large?: boolean;
	textInputArea?: React.RefObject<HTMLTextAreaElement>;
};

const LargeTextField = (props: Props) => {
	const {
		label,
		updateBodyText,
		valueType,
		type,
		webData,
		wordCounter,
		index,
		large,
		textInputArea,
	} = props;

	const length = webData?.length;

	return (
		<>
			<Label>{label}</Label>
			{wordCounter && <h5>Tecken: {length}</h5>}
			{large ? (
				<TextArea
					ref={textInputArea}
					autoFocus
					value={webData}
					onChange={(e) =>
						updateBodyText(index, valueType, e.currentTarget.value)
					}
					style={{ height: large ? '200px' : '' }}
				/>
			) : (
				<Input
					type={type}
					value={webData}
					onChange={(e) =>
						updateBodyText(index, valueType, e.currentTarget.value)
					}
					style={{ height: large ? '200px' : '' }}
				/>
			)}
		</>
	);
};

const Label = styled.label``;

const TextArea = styled.textarea`
	margin-bottom: 12px;
`;
const Input = styled.input`
	margin-bottom: 12px;
`;

export default LargeTextField;
