'use client';
import { PAGE_ROUTES } from '@/PageRoutes';
import { Container as Base } from '@/Shared/Styles';
import { faStore } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const tabMap = [
  {
    name: 'Butiker',
    icon: faStore,
    href: PAGE_ROUTES.ecommerceStores,
  },
  {
    name: 'Produkter',
    icon: faStore,
    href: PAGE_ROUTES.products,
  },
  {
    name: 'Butiker',
    icon: faStore,
    href: PAGE_ROUTES.ecommerceStores,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Base>
      <TabContainer>
        {tabMap.map((item, index) => (
          <Link href={item.href} key={index}>
            <TabList>
              <FontAwesomeIcon icon={item.icon} />
              <div>{item.name}</div>
            </TabList>
          </Link>
        ))}
      </TabContainer>
      {children}
    </Base>
  );
}

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 48px;
  padding-right: 48px;
  align-items: center;
  text-align: center;
  background-color: #f1efef;
  border-radius: 12px;
  padding: 8px;
  padding-left: 48px;
  padding-right: 48px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TabList = styled.div``;
