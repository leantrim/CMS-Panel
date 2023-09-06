import { faBrowser } from "@fortawesome/pro-light-svg-icons";
import { faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/pro-duotone-svg-icons";
import { faGearCode } from "@fortawesome/pro-thin-svg-icons";
import { usePathname } from "next/navigation";

const SidebarItems = [
  {
    title: "Websites",
    icon: faBrowser,
    href: "/sites",
  },
  {
    title: "Site Configurator",
    icon: faGearCode,
    href: "/websiteconfigurator",
  },
  {
    title: "Forms",
    icon: faEnvelope,
    href: "/forms",
  },
  {
    title: "Users",
    icon: faUser,
    href: "/users",
  },
];

const SideBar = () => {
  const pathname = usePathname().split("/").slice(0, 2).join("/");

  return (
    <Container>
      <SubContainer>
        {SidebarItems.map((item, index) => (
          <Link href={item.href} key={item.href}>
            <IconContainer key={item.href} isactive={pathname === item.href}>
              <StyledIcon icon={item.icon} size='2x' />
              <span>{item.title}</span>
            </IconContainer>
          </Link>
        ))}
      </SubContainer>
    </Container>
  );
};

const IconContainer = styled.div<{ isactive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: ${(props) =>
    props.isactive ? "1px solid rgb(185, 214, 255)" : "none"};
  border-bottom: ${(props) =>
    props.isactive ? "1px solid rgb(185, 214, 255)" : "none"};
  border-left: ${(props) =>
    props.isactive ? "1px solid rgb(185, 214, 255)" : "none"};
  background-color: ${(props) =>
    props.isactive ? "rgb(236, 244, 255)" : "transparent"};
  font-weight: ${(props) => (props.isactive ? 600 : 400)};
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  padding: 6px;
  padding-left: 12px;
  &:hover {
    border-top: 1px solid rgb(185, 214, 255);
    border-bottom: 1px solid rgb(185, 214, 255);
    border-left: 1px solid rgb(185, 214, 255);
    background-color: rgb(216, 224, 233);
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
