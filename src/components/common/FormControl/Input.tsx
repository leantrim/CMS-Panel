import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Container, ErrorContainer, Icon, InputDiv, Label } from "./FormStyles";

function Input({ name, label, style, error, icon, ...restProps }: any) {
  return (
    <Container>
      <InputContainer>
        <InputDiv
          className={`${restProps.value ? "has-value" : ""}`}
          type='text'
          {...restProps}
          name={name}
        />
        <Label className={restProps.value ? "has-value" : ""}>{label}</Label>
        <Icon
          className={
            error ? "has-error" : "" || restProps.value ? "has-value" : ""
          }
        >
          {icon && <FontAwesomeIcon icon={icon} />}
        </Icon>
      </InputContainer>
      {error && (
        <ErrorContainer className={style + "-alert"}>{error}</ErrorContainer>
      )}
    </Container>
  );
}

const InputContainer = styled.div``;

export default Input;
