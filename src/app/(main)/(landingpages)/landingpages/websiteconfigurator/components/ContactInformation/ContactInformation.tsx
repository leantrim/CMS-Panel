import React from 'react';
import MainSectionContainer from '@/components/common/MainSectionContainer';
import TextField from '@/components/common/TextField';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { updateWebData } from '@/redux/features/webDataSlice';
import { WebsiteModelKeys, SitePropertyModelKey } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';

const ContactInformation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <MainSectionContainer
      title="Kontakt information"
      infoText="Kontakt information om företaget"
      keyType={WebsiteModelKeys.ContactInfo}
      disableAddButton
    >
      <>
        <TextField
          key={SitePropertyModelKey.PhoneNumber}
          label="Telefonnummer:"
          onTextUpdate={(e) => {
            dispatch(
              updateWebData({
                key: WebsiteModelKeys.ContactInfo,
                fieldKey: SitePropertyModelKey.PhoneNumber,
                value: e.currentTarget.value,
              }),
            );
          }}
          value={webData[WebsiteModelKeys.ContactInfo]?.[SitePropertyModelKey.PhoneNumber]}
        />
        <TextField
          key={SitePropertyModelKey.Email}
          label="Email:"
          onTextUpdate={(e) => {
            dispatch(
              updateWebData({
                key: WebsiteModelKeys.ContactInfo,
                fieldKey: SitePropertyModelKey.Email,
                value: e.currentTarget.value,
              }),
            );
          }}
          value={webData[WebsiteModelKeys.ContactInfo]?.[SitePropertyModelKey.Email]}
        />
        <TextField
          key={SitePropertyModelKey.Address}
          label="Address:"
          onTextUpdate={(e) => {
            dispatch(
              updateWebData({
                key: WebsiteModelKeys.ContactInfo,
                fieldKey: SitePropertyModelKey.Address,
                value: e.currentTarget.value,
              }),
            );
          }}
          value={webData[WebsiteModelKeys.ContactInfo]?.[SitePropertyModelKey.Address]}
        />
        <TextField
          key={SitePropertyModelKey.CompanyName}
          label="Företagsnamn:"
          onTextUpdate={(e) => {
            dispatch(
              updateWebData({
                key: WebsiteModelKeys.ContactInfo,
                fieldKey: SitePropertyModelKey.CompanyName,
                value: e.currentTarget.value,
              }),
            );
          }}
          value={webData[WebsiteModelKeys.ContactInfo]?.[SitePropertyModelKey.CompanyName]}
        />
      </>
    </MainSectionContainer>
  );
};

export default ContactInformation;
