import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  value: string;
  wordCounter?: boolean;
  large?: boolean;
  textInputArea?: React.RefObject<HTMLTextAreaElement>;
  onTextUpdate: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const TextField = (props: Props) => {
  const { label, value, wordCounter, large, onTextUpdate } = props;

  const length = value?.length;

  return (
    <Container>
      <Label>{label}</Label>
      {wordCounter && <Counter>Tecken: {length}</Counter>}
      {large ? (
        <TextArea
          onChange={(e) => onTextUpdate(e)}
          ref={props.textInputArea}
          value={value}
        />
      ) : (
        <Input onChange={(e) => onTextUpdate(e)} value={value} />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2em;
  color: #333;
`;

const Counter = styled.h5`
  font-size: 0.8em;
  color: #999;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
`;

export default TextField;
