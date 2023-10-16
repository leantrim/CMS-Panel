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
import FileUpload from '../FileUpload/FileUpload';

const Reviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <MainSectionContainer title="Reviews" infoText="Kundrecensioner" keyType={WebsiteModelKeys.Reviews}>
      <>
        {webData[WebsiteModelKeys.Reviews]?.map((_, index) => (
          <SubSectionContainer
            key={index}
            onClickDelete={() => {
              const payload = {
                key: WebsiteModelKeys.Reviews as keyof WebsiteModel,
                index,
              };
              dispatch(deleteData(payload));
            }}
            title={`Section ${index}`}
            value={webData[WebsiteModelKeys.Reviews][index]?.comment ?? 'Ny sektion'}
          >
            <FileUpload
              onImageUpdate={(value) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Reviews,
                    fieldKey: SitePropertyModelKey.ImageUrl,
                    value: value,
                    index,
                  }),
                );
              }}
              title={'Service Bild'}
              value={webData[WebsiteModelKeys.Reviews][index]?.[SitePropertyModelKey.ImageUrl]}
            />
            <TextField
              key={SitePropertyModelKey.Title}
              label="Titel"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Reviews,
                    fieldKey: SitePropertyModelKey.Title,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Reviews][index]?.[SitePropertyModelKey.Title]}
            />
            <TextField
              key={SitePropertyModelKey.MetaTitle}
              label="Meta Title"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Reviews,
                    fieldKey: SitePropertyModelKey.MetaTitle,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Reviews][index]?.[SitePropertyModelKey.MetaTitle]}
              wordCounter={metaTitleWordInfo}
            />
            <TextField
              key={SitePropertyModelKey.MetaDescription}
              label="Meta Beskrivning"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Reviews,
                    fieldKey: SitePropertyModelKey.MetaDescription,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Reviews][index]?.[SitePropertyModelKey.MetaDescription]}
              wordCounter={metaDescriptionInfo}
              large
            />
            <TextField
              key={SitePropertyModelKey.Text}
              label="Text (visas i huvudsidan där vi listar våra tjänster)"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Reviews,
                    fieldKey: SitePropertyModelKey.Text,
                    value: e.currentTarget.value,
                    index: index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Reviews][index]?.[SitePropertyModelKey.Text]}
              large
            />
          </SubSectionContainer>
        ))}
      </>
    </MainSectionContainer>
  );
};

export default Reviews;
