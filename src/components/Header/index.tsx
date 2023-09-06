import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Logo
        src='https://mediapartners.se/_next/image?url=%2Fimages%2Fmediapartners-nobg.png&w=640&q=75'
        alt='Media Partners Logo'
      />
      <CMS>- CMS</CMS>
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(to right, #6ca1f8, #6edc85, #fddc85, #f78f8f);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  position: fixed;
  width: 100%;
`;

const Logo = styled.img`
  height: 58px;
`;

const CMS = styled.span`
  font-size: 22px;
`;

export default Header;
