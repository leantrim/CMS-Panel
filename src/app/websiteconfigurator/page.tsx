"use client";
import React from "react";
import styled from "styled-components";
import MainSettings from "@/app/websiteconfigurator/MainSettings";
import AboutUs from "@/app/websiteconfigurator/AboutUs";
import BodySection from "@/app/websiteconfigurator/Body";
import Services from "./Services";
import ContactInformation from "./ContactInformation";
import { useSharedWebData } from "@/context/WebDataContext";

const WebsiteConfigurator: React.FC = () => {
  const { webData } = useSharedWebData();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(webData);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <MainSettings />
        <ContactInformation />
        <AboutUs />
        <BodySection />
        <Services />
        <Button type='submit'>Skapa</Button>
      </Form>
    </Container>
  );
};

const Button = styled.button`
  margin-top: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 48px;
  width: 100%;
  max-width: 800px;
  gap: 16px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default WebsiteConfigurator;
