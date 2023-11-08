import { faBrowser, faGear, faGlobe, faStore } from '@fortawesome/pro-light-svg-icons';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Link from 'next/link';
import { faEnvelope } from '@fortawesome/pro-duotone-svg-icons';
import { usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { PAGE_ROUTES } from '@/PageRoutes';

const SidebarItems = [
  {
    title: 'Landnings Sidor',
    icon: faBrowser,
    href: PAGE_ROUTES.landingSites,
    subItems: [
      {
        title: 'Forms',
        icon: faEnvelope,
        href: PAGE_ROUTES.landingForms,
      },
    ],
  },
  {
    title: 'E-Handel',
    icon: faStore,
    href: PAGE_ROUTES.ecommerce,
  },
  {
    title: 'Panel Settings',
    icon: faGear,
    href: '/users',
  },
];

type Props = {
  isLoggedIn: boolean;
};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <Container>
      <SubContainer>
        {SidebarItems.map((item, index) => (
          <div key={index} className="py-10">
            <Link href={item.href}>
              <IconContainer key={item.href} isactive={pathname.includes(item.href)}>
                <div>
                  <FontAwesomeIcon icon={item.icon} size="xs" className="text-sm" />
                  <span>{item.title}</span>
                </div>
              </IconContainer>
            </Link>
          </div>
        ))}
      </SubContainer>
    </Container>
  );
};

const SubItemContainer = styled.div``;

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
