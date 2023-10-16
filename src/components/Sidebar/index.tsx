import { faBrowser } from '@fortawesome/pro-light-svg-icons';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { faEnvelope } from '@fortawesome/pro-duotone-svg-icons';
import { faGearCode } from '@fortawesome/pro-thin-svg-icons';
import { usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';

const SidebarItems = [
  {
    title: 'Websites',
    icon: faBrowser,
    href: '/sites',
  },
  {
    title: 'Forms',
    icon: faEnvelope,
    href: '/forms',
  },
  {
    title: 'Users',
    icon: faUser,
    href: '/users',
  },
];

type Props = {
  isLoggedIn: boolean;
};

const SideBar = (props: Props) => {
  const pathname = usePathname().split('/').slice(0, 2).join('/');
  const skeletonStyle = {
    borderBottomLeftRadius: '50px',
    borderTopLeftRadius: '50px',
    marginBottom: '6px',
  };

  return (
    <Container>
      <SubContainer>
        {props.isLoggedIn ? (
          SidebarItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <IconContainer key={item.href} isactive={pathname === item.href}>
                <StyledIcon icon={item.icon} size="2x" />
                <span>{item.title}</span>
              </IconContainer>
            </Link>
          ))
        ) : (
          <Skeleton count={SidebarItems.length} height={46} style={skeletonStyle} baseColor="rgb(185,214,255)" />
        )}
      </SubContainer>
    </Container>
  );
};

const IconContainer = styled.div<{ isactive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: ${(props) => (props.isactive ? '1px solid rgb(185, 214, 255)' : 'none')};
  border-bottom: ${(props) => (props.isactive ? '1px solid rgb(185, 214, 255)' : 'none')};
  border-left: ${(props) => (props.isactive ? '1px solid rgb(185, 214, 255)' : 'none')};
  background-color: ${(props) => (props.isactive ? 'rgb(236, 244, 255)' : 'transparent')};
  font-weight: ${(props) => (props.isactive ? 600 : 400)};
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  padding: 6px;
  padding-left: 12px;
  &:hover {
    border-top: ${(props) => !props.isactive && '1px solid rgb(185, 214, 255)'};
    border-bottom: ${(props) => !props.isactive && '1px solid rgb(185, 214, 255)'};
    border-left: ${(props) => !props.isactive && '1px solid rgb(185, 214, 255)'};
    cursor: ${(props) => props.isactive && 'default'};
    background-color: ${(props) => (!props.isactive ? 'rgb(216, 224, 233)' : 'rgb(236, 244, 255)')};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #6daee0;
  min-width: 32px;
`;

const SubContainer = styled.div`
  padding-top: 12px;
  width: 188px;
  position: fixed;
`;

const Container = styled.div`
  background-color: white;
  padding-left: 12px;
  padding-top: 22px;
  height: 100%;
  min-height: 95vh;
`;

export default SideBar;
