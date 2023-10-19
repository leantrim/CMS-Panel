'use client';
import { useState, useEffect } from 'react';
import CreateNewSite from './CreateNewSite';
import { Container } from '@/Shared/Styles';
import DisplaySite from './DisplaySite';
import { WebsiteModel } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';

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
