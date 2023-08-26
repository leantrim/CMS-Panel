import React from "react";
import styled from "styled-components";

export enum ButtonType {
  PRIMARY,
  SECONDARY,
  WARNING,
}

type Props = {
  label: string;
  handleClick: () => void;
  disabled?: boolean;
  type: ButtonType;
};

const SharedButton = (props: Props) => {
  const { label, handleClick, disabled, type } = props;

  const handleClickWithPrevention = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    handleClick();
  };
  return (
    <Container>
      <Button
        disabled={disabled}
        onClick={handleClickWithPrevention}
        buttonType={type}
      >
        {label}
      </Button>
    </Container>
  );
};

type ButtonStyles = {
  buttonType: ButtonType;
};

export const Button = styled.button<ButtonStyles>`
  padding: 12px 24px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
  :hover {
    background-color: #0056b3;
  }
  :disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  color: ${(props) => props.theme.default};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default SharedButton;
