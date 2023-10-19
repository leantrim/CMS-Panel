import { InfoText, SectionTitle } from '@/Shared/Styles';
import { useState } from 'react';
import ToggleContainerVisibility from './ToggleContainerVisibility';
import styled from 'styled-components';
import SharedButton, { ButtonType } from '@/Shared/SharedButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addData } from '@/redux/features/webDataSlice';
import { WebsiteModel } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';

interface MainSectionContainerProps {
  children: React.ReactNode;
  title: string;
  infoText: string;
  keyType: keyof WebsiteModel;
  disableAddButton?: boolean;
}

const MainSectionContainer: React.FC<MainSectionContainerProps> = ({
  children,
  title,
  infoText,
  keyType,
  disableAddButton,
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Container
      style={{ cursor: !showSettings ? 'pointer' : 'default' }}
      onClick={() => {
        if (!showSettings) setShowSettings(true);
      }}
      showSettings={showSettings}
    >
      <ToggleContainerVisibility setShowSettings={setShowSettings} showSettings={showSettings} />
      <InfoContainer>
        <SectionTitle>{title}</SectionTitle>
        {showSettings && <InfoText>{infoText}</InfoText>}
      </InfoContainer>
      {showSettings && (
        <>
          {children}
          {!disableAddButton && (
            <SharedButton
              handleClick={() => dispatch(addData({ key: keyType }))}
              label="Skapa ny sektion"
              buttonType={ButtonType.PRIMARY}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default MainSectionContainer;

const Container = styled.div<{ showSettings: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
  padding: ${(props) => (props.showSettings ? '24px' : '6px')}; // Change padding when showSettings is true
  gap: ${(props) => (props.showSettings ? '12px' : '0px')};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  gap: 12px;
`;
