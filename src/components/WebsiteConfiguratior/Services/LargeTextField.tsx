import { Services } from '@/types/WebsiteModel';
import React from 'react';
import styled from 'styled-components';

type Props = {
	label: string;
	type: string;
	updateServices: (index: number, key: keyof Services, value: string) => void;
	valueType: keyof Services;
	webData: string;
	wordCounter?: boolean;
	index: number;
	large?: boolean;
};

const LargeTextField = (props: Props) => {
	const {
		label,
		updateServices,
		valueType,
		type,
		webData,
		wordCounter,
		index,
		large,
	} = props;

	const length = webData?.length;

	return (
		<>
			<Label>{label}</Label>
			{wordCounter && <h5>Tecken: {length}</h5>}
			{large ? (
				<TextArea
					autoFocus
					value={webData}
					onChange={(e) =>
						updateServices(index, valueType, e.currentTarget.value)
					}
					style={{ height: large ? '200px' : '' }}
				/>
			) : (
				<Input
					type={type}
					value={webData}
					onChange={(e) =>
						updateServices(index, valueType, e.currentTarget.value)
					}
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
