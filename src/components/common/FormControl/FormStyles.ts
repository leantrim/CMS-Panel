import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-bottom: 26px;
`;

export const Label = styled.label`
  left: 12px;
  position: absolute;
  top: 20px;
  transition: 0.5s;
  color: #888888;
`;

export const ErrorContainer = styled.div`
  color: #da1515;
  font-size: 14px;
  margin-top: 5px;
`;

export const InputDiv = styled.input`
  height: 56px;
  width: 260px;
  border: 2px solid #888888;
  border-radius: 8px;
  outline: none;
  background: transparent;
  color: black;
  font-size: 16px;

  :is(input:focus) {
    border-color: black;
  }

  :is(input:focus) ~ span {
    color: #f9f9f9;
  }

  :is(input:focus, .has-value) ~ label {
    color: black;
    translate: 0 -42px;
  }

  :is(.has-error):not(:focus) {
    border-color: red;
  }
`;

export const Icon = styled.span`
  font-size: 28px;
  position: relative;
  right: 48px;
  top: 6px;
  transition: 0.3s;

  :is(input:focus) {
    border-color: white;
  }

  :is(.has-error) {
    color: #da1515;
    translate: 0 -42px;
    border-color: red;
  }
  :is(.has-value) {
    color: green;
  }
`;
