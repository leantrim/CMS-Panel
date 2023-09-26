'use client';
import { useState, useEffect } from 'react';
import { WebsiteModel } from 'types/WebsiteModel';
import CreateNewSite from './CreateNewSite';
import { Container } from '@/Shared/Styles';
import DisplaySite from './DisplaySite';

type Props = {
  sites: WebsiteModel[];
};

const Main = (props: Props) => {
  const style = {
    gap: '24px',
  };

  return (
    <Container style={style}>
      <CreateNewSite />
      {props.sites.map((site, index) => (
        <DisplaySite site={site} key={index} />
      ))}
    </Container>
  );
};

export default Main;
