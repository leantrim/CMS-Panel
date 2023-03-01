import { WebsiteModel } from '@/types/WebsiteModel';
import React from 'react';
import styled from 'styled-components';

type Props = {
	label: string;
	type: string;
	update: (
		key: keyof WebsiteModel,
		value: WebsiteModel[keyof WebsiteModel]
	) => void;
	valueType: keyof WebsiteModel;
	webData: string;
	wordCounter?: boolean;
	large?: boolean;
	textInputArea?: React.RefObject<HTMLTextAreaElement>;
};

const Field = (props: Props) => {
	const { label, update, valueType, type, webData, wordCounter, large } = props;

	const length = webData?.length;

	return (
		<>
			<Label>{label}</Label>
			{wordCounter && <h5>Tecken: {length}</h5>}
			{large ? (
				<textarea
					onChange={(e) => update(valueType, e.currentTarget.value)}
					style={{ height: '200px' }}
					ref={props.textInputArea}
				/>
			) : (
				<Input
					onChange={(e) => update(valueType, e.currentTarget.value)}
					type={type}
				/>
			)}
		</>
	);
};

const Label = styled.label``;

const Input = styled.input`
	margin-bottom: 12px;
`;

export default Field;
