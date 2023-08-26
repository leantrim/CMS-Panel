"use client";
import ToggleContainerVisibility from "@/components/common/ToggleContainerVisibility";
import Field from "@/Shared/TextField";
import {
  SitePropertyModelKey,
  WebsiteModel,
  WebsiteModelKeys,
} from "@/types/WebsiteModel";
import React from "react";
import { Container, HeadContainer } from "../../../Shared/Styles";
import { useRef } from "react";
import ChatGpt from "@/components/chatgpt";
import MainSectionContainer from "@/components/common/MainSectionContainer";
import TextField from "@/Shared/TextField";
import { useSharedWebData } from "@/context/WebDataContext";
import SubSectionContainer from "@/components/common/SubSectionContainer";

const AboutUs = () => {
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const { webData, updateWebData } = useSharedWebData();

  return (
    <MainSectionContainer
      title='Om Oss'
      infoText='Om oss som syns på om oss sidan?'
      keyType={WebsiteModelKeys.AboutUs}
      disableAddButton
    >
      <>
        <TextField
          label='Title'
          onTextUpdate={(e) => {
            updateWebData(
              WebsiteModelKeys.AboutUs,
              null,
              e.currentTarget.value
            );
          }}
          value={webData[WebsiteModelKeys.AboutUs]}
          large
        />
        <ChatGpt textInputArea={messageInput} />
      </>
    </MainSectionContainer>
  );
};

export default AboutUs;
