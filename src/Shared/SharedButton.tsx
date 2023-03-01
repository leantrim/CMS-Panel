import React from 'react';
import styled from 'styled-components';

type Props = {
	label: string;
	handleClick: () => void;
	disabled?: boolean;
};

const SharedButton = (props: Props) => {
	const { label, handleClick, disabled } = props;

	const handleClickWithPrevention = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		handleClick();
	};
	return (
		<Container>
			<Button disabled={disabled} onClick={handleClickWithPrevention}>
				{label}
			</Button>
		</Container>
	);
};

export const Button = styled.button`
	padding: 8px;
	color: #fff;
	background-color: #539120;
	border: none;
	font-size: 14px;
	cursor: pointer;
	:hover {
		background-color: #447719;
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

export default SharedButton;
