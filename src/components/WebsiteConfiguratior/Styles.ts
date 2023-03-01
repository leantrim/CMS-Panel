import styled from 'styled-components';

type StyleProps = {
	isActive: boolean;
};

export const Container = styled.div<StyleProps>`
	display: flex;
	flex-direction: column;
	border: 1px solid grey;
	padding: 24px;
	gap: 8px;
	margin-bottom: 24px;
	padding: ${(props) => (props.isActive ? '24px' : '12px')};
`;

export const HeadContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
