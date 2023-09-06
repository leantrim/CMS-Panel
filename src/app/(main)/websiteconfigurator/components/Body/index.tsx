import { SitePropertyModelKey, WebsiteModelKeys } from "types/WebsiteModel";
import React from "react";
import styled from "styled-components";
import TextField from "@/components/common/TextField";
import { useSharedWebData } from "@/context/WebDataContext";
import SectionContainer from "@/components/common/MainSectionContainer";
import SubSectionContainer from "@/components/common/SubSectionContainer";

const BodySection = () => {
  const { webData, updateWebData, deleteData } = useSharedWebData();

  return (
    <SectionContainer
      title='Text Information'
      infoText='Text som syns på framsidan!'
      keyType={WebsiteModelKeys.Bodys}
    >
      <>
        {webData[WebsiteModelKeys.Bodys]?.map((_, index) => (
          <SubSectionContainer
            key={index}
            onClickDelete={() => deleteData(WebsiteModelKeys.Bodys, index)}
            title={`Section ${index}`}
            value={
              webData[WebsiteModelKeys.Bodys][index]?.title ?? "Ny sektion"
            }
          >
            <TextField
              label='Title'
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Bodys,
                  SitePropertyModelKey.Title,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Bodys][index]?.[
                  SitePropertyModelKey.Title
                ]
              }
            />
            <TextField
              label='Text'
              large
              onTextUpdate={(e) => {
                updateWebData(
                  WebsiteModelKeys.Bodys,
                  SitePropertyModelKey.Text,
                  e.currentTarget.value,
                  index
                );
              }}
              value={
                webData[WebsiteModelKeys.Bodys][index]?.[
                  SitePropertyModelKey.Text
                ]
              }
            />
          </SubSectionContainer>
        ))}
      </>
    </SectionContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 12px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e9ecef;
  padding: 24px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export default BodySection;
