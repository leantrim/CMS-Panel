import { WebsiteModel, WebsiteModelKeys } from 'types/WebsiteModel';
import dynamic from 'next/dynamic';
import React from 'react';
import TextField, { WordCounterType } from '@/components/common/TextField';
import { ColorResult } from 'react-color';
import styled from 'styled-components';
import { Container, SectionSubTitle, SectionTitle } from '@/Shared/Styles';
import FileUpload from '../FileUpload/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/redux/store';
import { updateWebData } from '@/redux/features/webDataSlice';
import { metaDescriptionInfo, metaTitleWordInfo } from '@/constants/wordCounters';

const ColorPicker = dynamic(() => import('../../../../../components/common/ColorPicker'), {
  ssr: true,
});

const MainSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <Container>
      <HeadContainer>
        <SectionTitle>Huvudinställningar</SectionTitle>
        <SectionSubTitle className="url-title">{webData.url}</SectionSubTitle>
      </HeadContainer>
      <>
        <FileUpload
          onImageUpdate={(value) => {
            const payload = {
              key: WebsiteModelKeys.ImageUrl as keyof WebsiteModel,
              fieldKey: null,
              value: value,
            };
            dispatch(updateWebData(payload));
          }}
          title={'Huvudbild'}
          value={webData[WebsiteModelKeys.ImageUrl]}
        />
        <FileUpload
          onImageUpdate={(value) => {
            const payload = {
              key: WebsiteModelKeys.Favicon as keyof WebsiteModel,
              fieldKey: null,
              value: value,
            };
            dispatch(updateWebData(payload));
          }}
          title={'Favicon'}
          value={webData[WebsiteModelKeys.Favicon]}
        />
        <TextField
          key={WebsiteModelKeys.Url}
          label="Hemsida URL (exempel.se):"
          onTextUpdate={(e) => {
            const payload = {
              key: WebsiteModelKeys.ImageUrl as keyof WebsiteModel,
              fieldKey: null,
              value: e.currentTarget.value,
            };
            dispatch(updateWebData(payload));
          }}
          value={webData[WebsiteModelKeys.Url]}
        />
        <TextField
          key={WebsiteModelKeys.MetaTitle}
          label="Meta title"
          onTextUpdate={(e) => {
            const payload = {
              key: WebsiteModelKeys.MetaTitle as keyof WebsiteModel,
              fieldKey: null,
              value: e.currentTarget.value,
            };
            dispatch(updateWebData(payload));
          }}
          value={webData[WebsiteModelKeys.MetaTitle]}
          wordCounter={metaTitleWordInfo}
        />
        <TextField
          key={WebsiteModelKeys.MetaDescription}
          label="Meta beskrivning"
          onTextUpdate={(e) => {
            const payload = {
              key: WebsiteModelKeys.MetaDescription as keyof WebsiteModel,
              fieldKey: null,
              value: e.currentTarget.value,
            };
            dispatch(updateWebData(payload));
          }}
          value={webData[WebsiteModelKeys.MetaDescription]}
          wordCounter={metaDescriptionInfo}
          large
        />
        <ColorPickerContainer>
          <ColorPicker
            key={WebsiteModelKeys.PrimaryColor}
            title="Primär färg"
            onColorUpdate={(colorValue: ColorResult) => {
              const payload = {
                key: WebsiteModelKeys.PrimaryColor as keyof WebsiteModel,
                fieldKey: null,
                value: colorValue.hex,
              };
              dispatch(updateWebData(payload));
            }}
            value={webData[WebsiteModelKeys.PrimaryColor]}
          />
          <ColorPicker
            key={WebsiteModelKeys.SecondaryColor}
            title="Sekundär färg"
            onColorUpdate={(colorValue: ColorResult) => {
              const payload = {
                key: WebsiteModelKeys.SecondaryColor as keyof WebsiteModel,
                fieldKey: null,
                value: colorValue.hex,
              };
              dispatch(updateWebData(payload));
            }}
            value={webData[WebsiteModelKeys.SecondaryColor]}
          />
        </ColorPickerContainer>
      </>
    </Container>
  );
};

const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .url-title {
    color: #6cb1d9;
    font-weight: 700;
    font-size: 23px;
    background-color: #f0f0f0;
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 12px;
    margin-top: 12px;
  }
`;

const ColorPickerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 48px;
  text-align: center;
`;

export default MainSettings;
