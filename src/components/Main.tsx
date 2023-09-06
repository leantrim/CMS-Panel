"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Main = () => {
  return (
    <Container>
      <StyledLink href='/websiteconfigurator'>Skapa ny hemsida</StyledLink>
    </Container>
  );
};

const StyledLink = styled(Link)`
  background-color: red;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Main;
