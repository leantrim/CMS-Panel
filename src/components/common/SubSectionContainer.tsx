import styled from "styled-components";
import ToggleContainerVisibility from "./ToggleContainerVisibility";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface SubSectionContainer {
  children: React.ReactNode;
  onClickDelete: () => void;
  value: string;
  title: string;
}

const SubSectionContainer = (props: SubSectionContainer) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { children, onClickDelete, value, title } = props;
  return (
    <Container
      onClick={() => {
        if (!showSettings) setShowSettings(true);
      }}
      style={{ cursor: !showSettings ? "pointer" : "default" }}
      showSettings={!showSettings}
    >
      <DeleteExpand>
        <ToggleContainerVisibility
          setShowSettings={setShowSettings}
          showSettings={showSettings}
        />
        <StyledIcon icon={faTrashCan} onClick={onClickDelete} />
      </DeleteExpand>
      <SectionHeader title={title} value={value} />
      {showSettings && children}
    </Container>
  );
};

export default SubSectionContainer;

const DeleteExpand = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div<{ showSettings: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #e9ecef;
  padding: 24px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
  gap: 12px;
  cursor: default;
  &:hover {
    ${(props) =>
      props.showSettings &&
      `
        background-color: #e7e4e4;
        cursor: pointer;
        transform: scale(1.01);
        transition: all 0.5s ease;
    `}
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  :hover {
    color: red;
  }
`;
