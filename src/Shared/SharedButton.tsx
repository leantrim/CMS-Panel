import React from 'react';
import styled from 'styled-components';
import { theme } from './Styles';

export enum ButtonType {
  PRIMARY,
  SECONDARY,
  WARNING,
}

type Props = {
  label: string;
  handleClick: (e: any) => void;
  disabled?: boolean;
  buttonType: ButtonType;
};

const SharedButton = (props: Props) => {
  const { label, handleClick, disabled, buttonType } = props;

  const handleClickWithPrevention = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClick(e);
  };
  return (
    <Container>
      <Button disabled={disabled} onClick={handleClickWithPrevention} buttonType={buttonType}>
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
  background-color: ${({ buttonType }) => {
    switch (buttonType) {
      case ButtonType.WARNING:
        return 'red';
      case ButtonType.PRIMARY:
        return theme.primary;
      case ButtonType.SECONDARY:
        return theme.secondary;
    }
  }};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
  :hover {
    filter: brightness(85%);
  }
  :disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default SharedButton;
