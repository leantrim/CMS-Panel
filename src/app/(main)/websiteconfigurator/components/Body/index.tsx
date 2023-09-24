import { SitePropertyModelKey, WebsiteModelKeys } from 'types/WebsiteModel';
import React from 'react';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import SectionContainer from '@/components/common/MainSectionContainer';
import SubSectionContainer from '@/components/common/SubSectionContainer';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { deleteData, updateWebData } from '@/redux/features/webDataSlice';

const BodySection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <SectionContainer title="Text Information" infoText="Text som syns på framsidan!" keyType={WebsiteModelKeys.Bodys}>
      <>
        {webData[WebsiteModelKeys.Bodys]?.map((_, index) => (
          <SubSectionContainer
            key={index}
            onClickDelete={() => dispatch(deleteData({ key: WebsiteModelKeys.Bodys, index }))}
            title={`Section ${index}`}
            value={webData[WebsiteModelKeys.Bodys][index]?.title ?? 'Ny sektion'}
          >
            <TextField
              label="Title"
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Bodys,
                    fieldKey: SitePropertyModelKey.Title,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Bodys][index]?.[SitePropertyModelKey.Title]}
            />
            <TextField
              label="Text"
              large
              onTextUpdate={(e) => {
                dispatch(
                  updateWebData({
                    key: WebsiteModelKeys.Bodys,
                    fieldKey: SitePropertyModelKey.Text,
                    value: e.currentTarget.value,
                    index,
                  }),
                );
              }}
              value={webData[WebsiteModelKeys.Bodys][index]?.[SitePropertyModelKey.Text]}
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
