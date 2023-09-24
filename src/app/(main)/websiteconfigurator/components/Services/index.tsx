import { SitePropertyModelKey, WebsiteModel, WebsiteModelKeys } from 'types/WebsiteModel';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainSectionContainer from '@/components/common/MainSectionContainer';
import SubSectionContainer from '@/components/common/SubSectionContainer';
import TextField from '@/components/common/TextField';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { deleteData, updateWebData } from '@/redux/features/webDataSlice';
import { metaDescriptionInfo, metaTitleWordInfo } from '@/constants/wordCounters';

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <MainSectionContainer title="Tjänster" infoText="Tjänster som sidan erbjuder" keyType={WebsiteModelKeys.Services}>
      <>
        {webData[WebsiteModelKeys.Services]?.map((_, index) => (
          <SubSectionContainer
            key={index}
            onClickDelete={() => {
              const payload = {
                key: WebsiteModelKeys.Services as keyof WebsiteModel,
                index,
              };
              dispatch(deleteData(payload));
            }}
            title={`Section ${index}`}
            value={webData[WebsiteModelKeys.Services][index]?.title ?? 'Ny sektion'}
          >
            <TextField
              key={SitePropertyModelKey.Title}
              label="Titel"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Services,
                    fieldKey: SitePropertyModelKey.Title,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Services][index]?.[SitePropertyModelKey.Title]}
            />
            <TextField
              key={SitePropertyModelKey.MetaTitle}
              label="Meta Title"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Services,
                    fieldKey: SitePropertyModelKey.MetaTitle,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Services][index]?.[SitePropertyModelKey.MetaTitle]}
              wordCounter={metaTitleWordInfo}
            />
            <TextField
              key={SitePropertyModelKey.MetaDescription}
              label="Meta Beskrivning"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Services,
                    fieldKey: SitePropertyModelKey.MetaDescription,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Services][index]?.[SitePropertyModelKey.MetaDescription]}
              wordCounter={metaDescriptionInfo}
              large
            />
            <TextField
              key={SitePropertyModelKey.ImageUrl}
              label="Bild Länk"
              onTextUpdate={(e) => {
                updateWebData({
                  key: WebsiteModelKeys.Services,
                  fieldKey: SitePropertyModelKey.ImageUrl,
                  value: e.currentTarget.value,
                  index,
                });
              }}
              value={webData[WebsiteModelKeys.Services][index]?.[SitePropertyModelKey.ImageUrl]}
            />
            <TextField
              key={SitePropertyModelKey.Text}
              label="Text (visas i huvudsidan där vi listar våra tjänster)"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Services,
                    fieldKey: SitePropertyModelKey.Text,
                    value: e.currentTarget.value,
                    index: index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Services][index]?.[SitePropertyModelKey.Text]}
              large
            />
          </SubSectionContainer>
        ))}
      </>
    </MainSectionContainer>
  );
};

export default Services;
