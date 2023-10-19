import { useState } from 'react';
import Input from './Input';
import { ObjectSchema } from 'joi';
import styled from 'styled-components';
import DropDownInput from './DropDowmInput';
import SharedButton, { ButtonType } from '@/Shared/SharedButton';

interface Form<Type> {
  initialData: Type;
  joiSchema: ObjectSchema;
  doSubmit: (formData: Type) => void;
}

export default function useForm<Type>({ initialData, joiSchema, doSubmit }: Form<Type>) {
  const [data, setData] = useState<any>(initialData);
  const [errors, setErrors] = useState<any>(initialData);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = joiSchema.validate(data, options);

    if (!error) return null;

    const errors: any = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  };

  interface ValidateProperty {
    name: string;
    value: string;
  }

  const validateProperty = ({ name, value }: ValidateProperty) => {
    const schema = joiSchema.extract(name);
    const { error } = schema.validate(value);

    if (!error) return null;

    return error.message;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setErrors({ ...errors });

    data[input.name] = input.value;
    setData(data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit(data);
  };

  const renderInput = (name: string, label: string, input = 'text', icon = undefined) => (
    <Input
      type={input}
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      icon={icon}
    />
  );

  const renderDropDown = (name: string, label: string, options: any[]) => (
    <DropDownInput
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      data={data}
      options={options}
    />
  );

  const renderButton = (input: string) => (
    <SharedButton
      disabled={validate()}
      label={input}
      buttonType={ButtonType.PRIMARY}
      handleClick={(e: any) => handleSubmit(e)}
    />
  );

  return {
    renderDropDown,
    renderButton,
    renderInput,
    handleSubmit,
    setData,
  };
}

const Button = styled.button`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  color: white;
  background-color: #164862;
  cursor: pointer;
  :hover {
    background-color: #2476a1;
  }
`;
