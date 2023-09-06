"use client";
import { useState } from "react";
import styled from "styled-components";
import Joi from "joi";
import useForm from "../../../components/common/FormControl/Form";
import Image from "next/image";
import auth from "../../../services/authService";
import Link from "next/link";
import { SectionTitle } from "@/Shared/Styles";

type Login = {
  email: string;
  password: string;
};

export default function Login() {
  const data: Login = { email: "", password: "" };
  const [errors, setErrors] = useState<any>();

  const joiSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  const doSubmit = async (data: Login) => {
    try {
      await auth.login(data);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  const { renderButton, renderInput, handleSubmit } = useForm<Login>({
    initialData: data,
    joiSchema,
    doSubmit,
  });

  return (
    <Container>
      <LoginContainer>
        <SectionTitle>Login</SectionTitle>
        <Form onSubmit={handleSubmit}>
          {renderInput("email", "Email", "")}
          {renderInput("password", "Password", "password")}
          {errors && <h4 className='register-errorresponse'>{errors}</h4>}
          {renderButton("Login")}
        </Form>
      </LoginContainer>
    </Container>
  );
}

const LoginContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #e9ecef;
`;
