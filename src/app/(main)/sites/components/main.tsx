"use client";
import SharedButton, { ButtonType } from "@/Shared/SharedButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { WebsiteModel } from "types/WebsiteModel";
import CreateNewSite from "./CreateNewSite";
import { Container } from "@/Shared/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrowser, faGear } from "@fortawesome/pro-light-svg-icons";
import DisplaySite from "./DisplaySite";

type Props = {
  sites: WebsiteModel[];
};

const Main = (props: Props) => {
  const [sites, setSites] = useState<WebsiteModel[]>([]);

  useEffect(() => {
    setSites(props.sites);
  }, []);

  return (
    <Container>
      <CreateNewSite />
      {sites.map((site) => (
        <DisplaySite site={site} />
      ))}
    </Container>
  );
};

export default Main;
