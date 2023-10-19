import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import { PAGE_ROUTES } from '@/PageRoutes';
import { StoreType } from '@mediapartners/shared-types/types/ecommerce/StoreType';

type Props = {
  store: StoreType;
};

const ListStore = (props: Props) => {
  const { store } = props;
  return (
    <StoreContainer>
      <StoreTitle>
        <span>Butiks Namn: {store.name}</span>
        <span>Butiks URL: {store.url}</span>
      </StoreTitle>
      <Link href={`${PAGE_ROUTES.ecommerceStores}/${store._id}`}>
        <StyledIcon icon={faGear} />
      </Link>
    </StoreContainer>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 28px;
`;

const StoreTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ListStore;
