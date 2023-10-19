'use client';
import { SectionSubTitle } from '@/Shared/Styles';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import styled from 'styled-components';

type ColorPreviewPros = {
  previewColor: string;
};

type Props = {
  title: string;
  value: string;
  onColorUpdate: (e: ColorResult) => void;
};

const ColorPicker = (props: Props) => {
  const { title, value, onColorUpdate } = props;
  const [showColorPicker, setShowColorPicker] = React.useState<boolean>(false);

  return (
    <div>
      <SectionSubTitle>{title}</SectionSubTitle>
      <PreviewContainer previewColor={value} onClick={() => setShowColorPicker(!showColorPicker)}>
        <FontAwesomeIcon icon={faPalette} />
      </PreviewContainer>
      {showColorPicker && (
        <ColorPickerContainer>
          <SketchPicker
            onChange={(valueType: ColorResult) => onColorUpdate(valueType)}
            color={value}
            styles={{
              default: {
                picker: {
                  paddingRight: '14px',
                  paddingLeft: '14px',
                },
              },
            }}
          />
        </ColorPickerContainer>
      )}
    </div>
  );
};

const ColorPickerContainer = styled.div`
  position: absolute;
`;

const PreviewContainer = styled.div<ColorPreviewPros>`
  background-color: ${(props) => props.previewColor};
  border: 1px solid black;
  height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 220px;
`;
export default ColorPicker;
