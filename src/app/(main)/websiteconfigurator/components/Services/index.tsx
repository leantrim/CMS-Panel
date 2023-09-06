import { SitePropertyModelKey, WebsiteModelKeys } from "types/WebsiteModel";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainSectionContainer from "@/components/common/MainSectionContainer";
import SubSectionContainer from "@/components/common/SubSectionContainer";
import { useSharedWebData } from "@/context/WebDataContext";
import TextField from "@/components/common/TextField";

const Services = () => {
  const { webData, updateWebData, addData, deleteData } = useSharedWebData();

  return (
    <MainSectionContainer
      title='Tjänster'
      infoText='Tjänster som sidan erbjuder'
      keyType={WebsiteModelKeys.Services}
    >
      <>
        {webData[WebsiteModelKeys.Services]?.map((_, index) => (
          <SubSectionContainer
            key={index}
            onClickDelete={() => deleteData(WebsiteModelKeys.Services, index)}
            title={`Section ${index}`}
            value={
              webData[WebsiteModelKeys.Services][index]?.title ?? "Ny sektion"
            }
          >
            <TextField
              label='Titel'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Services,
                  SitePropertyModelKey.Title,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Services][index]?.[
                  SitePropertyModelKey.Title
                ]
              }
            />
            <TextField
              label='Meta Title'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Services,
                  SitePropertyModelKey.MetaTitle,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Services][index]?.[
                  SitePropertyModelKey.MetaTitle
                ]
              }
              wordCounter
            />
            <TextField
              label='Meta Beskrivning'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Services,
                  SitePropertyModelKey.MetaDescription,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Services][index]?.[
                  SitePropertyModelKey.MetaDescription
                ]
              }
              wordCounter
            />
            <TextField
              label='Bild Länk'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Services,
                  SitePropertyModelKey.ImageUrl,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Services][index]?.[
                  SitePropertyModelKey.ImageUrl
                ]
              }
            />
            <TextField
              label='Text (visas i huvudsidan där vi listar våra tjänster)'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Services,
                  SitePropertyModelKey.Text,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Services][index]?.[
                  SitePropertyModelKey.Text
                ]
              }
              large
            />
          </SubSectionContainer>
        ))}
      </>
    </MainSectionContainer>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Services;
