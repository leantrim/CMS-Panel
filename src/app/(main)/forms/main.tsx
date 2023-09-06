"use client";
import { getForms } from "@/services/siteService";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FormTypes } from "types/Forms";

type Props = {
  forms: FormTypes[];
};

const Main = (props: Props) => {
  const [forms, setForms] = useState<FormTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForms(props.forms);
  }, []);
  return (
    <div>
      <Error>{error && error}</Error>
      {forms.map((form) => (
        <Container key={form._id}>
          <FormInfo>{form.email}</FormInfo>
          <FormInfo>{form.site}</FormInfo>
          <FormInfo>{form.phoneNumber}</FormInfo>
        </Container>
      ))}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const FormInfo = styled.div`
  margin-bottom: 10px;
`;

export default Main;
