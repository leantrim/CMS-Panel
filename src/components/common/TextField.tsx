import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  value: string;
  large?: boolean;
  textInputArea?: React.RefObject<HTMLTextAreaElement>;
  onTextUpdate: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  wordCounter?: WordCounterType;
};

export type WordCounterType = {
  minimumLength: number;
  maximumLength: number;
};

const TextField = (props: Props) => {
  const { label, value, wordCounter, large, onTextUpdate } = props;

  const length = value?.length;

  console.log(wordCounter);

  const getWordCountType = (length: number) => {
    const { minimumLength, maximumLength } = wordCounter!;
    if (length < minimumLength) {
      return 'LOW';
    }
    if (length > maximumLength) {
      return 'HIGH';
    }
    return 'NORMAL';
  };

  return (
    <Container>
      <Label>{label}</Label>
      {wordCounter && (
        <Counter>
          Tecken ({wordCounter.minimumLength}-{wordCounter.maximumLength}):{' '}
          <Length countType={getWordCountType(length)}>{length}</Length>
        </Counter>
      )}
      {large ? (
        <TextArea onChange={(e) => onTextUpdate(e)} ref={props.textInputArea} defaultValue={value} />
      ) : (
        <Input onChange={(e) => onTextUpdate(e)} defaultValue={value} />
      )}
    </Container>
  );
};

type CounterLabels = {
  countType: 'LOW' | 'NORMAL' | 'HIGH';
};
const Length = styled.span<CounterLabels>`
  padding: 4px;
  margin: 2px;
  color: white;
  border-radius: 6px;
  background-color: ${({ countType }) => {
    switch (countType) {
      case 'LOW':
        return 'red';
      case 'NORMAL':
        return 'green';
      case 'HIGH':
        return 'orange';
      default:
        return 'transparent';
    }
  }};
`;

const Counter = styled.h5`
  font-size: 0.8em;
  color: #999;
  margin-bottom: 5px;
`;

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
