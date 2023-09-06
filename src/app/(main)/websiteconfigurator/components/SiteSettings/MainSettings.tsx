import { WebsiteModelKeys } from 'types/WebsiteModel';
import dynamic from 'next/dynamic';
import React from 'react';
import TextField from '@/components/common/TextField';
import { useSharedWebData } from '@/context/WebDataContext';
import { ColorResult } from 'react-color';
import styled from 'styled-components';
import { Container, HeadContainer } from '@/Shared/Styles';
import FileUpload from '../FileUpload/FileUpload';

const ColorPicker = dynamic(() => import('../../../../../components/common/ColorPicker'), {
  ssr: true,
});

const MainSettings = () => {
  const { webData, updateWebData } = useSharedWebData();

  return (
    <Container>
      <HeadContainer>
        <h2>Huvudinställningar</h2>
      </HeadContainer>
      <>
        <FileUpload
          onImageUpdate={(value) => {
            updateWebData(WebsiteModelKeys.ImageUrl, null, value);
          }}
          title="Huvudbild"
          value={webData[WebsiteModelKeys.ImageUrl]}
        />
        <TextField
          label="Hemsida URL (exempel.se):"
          onTextUpdate={(e) => {
            updateWebData(WebsiteModelKeys.Url, null, e.currentTarget.value);
          }}
          value={webData[WebsiteModelKeys.Url]}
        />
        <TextField
          label="Meta title (max 60 tecken):"
          onTextUpdate={(e) => {
            updateWebData(WebsiteModelKeys.MetaTitle, null, e.currentTarget.value);
          }}
          value={webData[WebsiteModelKeys.MetaTitle]}
          wordCounter
        />
        <TextField
          label="Meta Beskrivning (max 160 tecken):"
          onTextUpdate={(e) => {
            updateWebData(WebsiteModelKeys.Description, null, e.currentTarget.value);
          }}
          value={webData[WebsiteModelKeys.Description]}
          wordCounter
        />
        <ColorPickerContainer>
          <ColorPicker
            title="Primär färg"
            onColorUpdate={(colorValue: ColorResult) => {
              updateWebData(WebsiteModelKeys.PrimaryColor, null, colorValue.hex);
            }}
            value={webData[WebsiteModelKeys.PrimaryColor]}
          />
          <ColorPicker
            title="Sekundär färg"
            onColorUpdate={(colorValue: ColorResult) => {
              updateWebData(WebsiteModelKeys.SecondaryColor, null, colorValue.hex);
            }}
            value={webData[WebsiteModelKeys.SecondaryColor]}
          />
        </ColorPickerContainer>
      </>
    </Container>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 48px;
  text-align: center;
`;

export default MainSettings;
