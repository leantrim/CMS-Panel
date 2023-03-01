import React from 'react';
import styled from 'styled-components';

const Header = () => {
	return (
		<Container>
			<h1>Media Partners - CMS</h1>
		</Container>
	);
};

const Container = styled.div`
	background-color: #abdcdc;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Header;
