import Field from "@/components/common/TextField";
import {
  SitePropertyModelKey,
  WebsiteModel,
  WebsiteModelKeys,
} from "types/WebsiteModel";
import React from "react";
import MainSectionContainer from "@/components/common/MainSectionContainer";
import TextField from "@/components/common/TextField";
import { useSharedWebData } from "@/context/WebDataContext";

const ContactInformation = () => {
  const { webData, updateWebData, addData, deleteData } = useSharedWebData();

  return (
    <MainSectionContainer
      title='Kontakt information'
      infoText='Tjänster som sidan erbjuder'
      keyType={WebsiteModelKeys.ContactInfo}
      disableAddButton
    >
      <>
        <TextField
          label='Telefonnummer:'
          onTextUpdate={(e) => {
            updateWebData(
              WebsiteModelKeys.ContactInfo,
              SitePropertyModelKey.PhoneNumber,
              e.currentTarget.value
            );
          }}
          value={
            webData[WebsiteModelKeys.ContactInfo]?.[
              SitePropertyModelKey.PhoneNumber
            ]
          }
        />
        <TextField
          label='Email:'
          onTextUpdate={(e) => {
            updateWebData(
              WebsiteModelKeys.ContactInfo,
              SitePropertyModelKey.Email,
              e.currentTarget.value
            );
          }}
          value={
            webData[WebsiteModelKeys.ContactInfo]?.[SitePropertyModelKey.Email]
          }
        />
        <TextField
          label='Address:'
          onTextUpdate={(e) => {
            updateWebData(
              WebsiteModelKeys.ContactInfo,
              SitePropertyModelKey.Address,
              e.currentTarget.value
            );
          }}
          value={
            webData[WebsiteModelKeys.ContactInfo]?.[
              SitePropertyModelKey.Address
            ]
          }
        />
        <TextField
          label='Företagsnamn:'
          onTextUpdate={(e) => {
            updateWebData(
              WebsiteModelKeys.ContactInfo,
              SitePropertyModelKey.CompanyName,
              e.currentTarget.value
            );
          }}
          value={
            webData[WebsiteModelKeys.ContactInfo]?.[
              SitePropertyModelKey.CompanyName
            ]
          }
        />
      </>
    </MainSectionContainer>
  );
};

export default ContactInformation;
