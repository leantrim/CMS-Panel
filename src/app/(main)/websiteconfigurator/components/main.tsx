"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSharedWebData } from "@/context/WebDataContext";
import MainSettings from "./SiteSettings/MainSettings";
import ContactInformation from "./ContactInformation/ContactInformation";
import AboutUs from "./AboutUs";
import BodySection from "./Body";
import Services from "./Services";
import { WebsiteModel } from "types/WebsiteModel";
import { updateSite } from "@/services/siteService";

type Props = {
  website?: WebsiteModel;
};

function WebsiteConfigurator(props: Props) {
  const { setWebData, webData } = useSharedWebData();
  const [errors, setErrors] = useState<string>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make Api request with data
      console.log(webData);
      await updateSite(webData);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  useEffect(() => {
    setWebData(webData);
  }, []);

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
}

const Button = styled.button`
  margin-top: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  padding-top: 26px;
`;

export default WebsiteConfigurator;
