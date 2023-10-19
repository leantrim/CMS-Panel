import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

type Props = {
  setShowSettings(boolean: boolean): void;
  showSettings: boolean;
};

const ToggleContainerVisibility = (props: Props) => {
  const { setShowSettings, showSettings } = props;
  return (
    <Container onClick={() => setShowSettings(!showSettings)}>
      <FontAwesomeIcon icon={showSettings ? faChevronUp : faChevronDown} />
      <span style={{ marginLeft: '8px' }}>{showSettings ? 'Dölj' : 'Expandera'}</span>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

export default ToggleContainerVisibility;
