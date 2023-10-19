'use client';
import { Container, SiteTitle } from '@/Shared/Styles';
import React from 'react';
import styled from 'styled-components';
import ListStore from './ListStore';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';

type Props = {
  stores: StoreType[];
};

const Store = (props: Props) => {
  const { stores } = props;
  return (
    <Container>
      <StoreSection>
        <SiteTitle style={{ fontSize: 36 }}>Butiker</SiteTitle>
        {stores.map((store) => (
          <ListStore store={store} key={store.url} />
        ))}
      </StoreSection>
    </Container>
  );
};

const StoreSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default Store;
