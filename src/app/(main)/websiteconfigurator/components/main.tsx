'use client';
import React, { useEffect, useState, useRef, EffectCallback, DependencyList, useMemo } from 'react';
import styled from 'styled-components';
import MainSettings from './SiteSettings/SiteSettings';
import ContactInformation from './ContactInformation/ContactInformation';
import AboutUs from './AboutUs';
import BodySection from './Body';
import Services from './Services';
import { WebsiteModel } from 'types/WebsiteModel';
import { updateSite } from '@/services/siteService';
import { useDispatch } from 'react-redux';
import { setWebData } from '@/redux/features/webDataSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { postData, putData } from '@/lib/queryApi';
import { API_ROUTES } from 'types/Routes';
import Reviews from './Reviews';

type Props = {
  website: WebsiteModel;
};

function WebsiteConfigurator(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);
  dispatch(setWebData(props.website));

  const [errors, setErrors] = useState<string>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateSite(webData);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  return (
    <Container>
      {errors && <div>{errors}</div>}
      <Form onSubmit={onSubmit}>
        <MainSettings />
        <ContactInformation />
        <AboutUs />
        <BodySection />
        <Services />
        <Reviews />
        <Button type="submit">Skapa</Button>
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
