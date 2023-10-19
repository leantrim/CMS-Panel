import React from 'react';
import { useRef } from 'react';
import ChatGpt from '@/components/chatgpt';
import MainSectionContainer from '@/components/common/MainSectionContainer';
import TextField from '@/components/common/TextField';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { updateWebData } from '@/redux/features/webDataSlice';
import { WebsiteModelKeys } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';

const AboutUs = () => {
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const webData = useAppSelector((state) => state.webData);

  return (
    <MainSectionContainer
      title="Om Oss"
      infoText="Om oss som syns på om oss sidan?"
      keyType={WebsiteModelKeys.AboutUs}
      disableAddButton
    >
      <>
        <TextField
          key={WebsiteModelKeys.AboutUs}
          label="Title"
          onTextUpdate={(e) => {
            dispatch(updateWebData({ key: WebsiteModelKeys.AboutUs, fieldKey: null, value: e.currentTarget.value }));
          }}
          value={webData[WebsiteModelKeys.AboutUs]}
          large
        />
        <ChatGpt textInputArea={messageInput} />
      </>
    </MainSectionContainer>
  );
};

export default AboutUs;
