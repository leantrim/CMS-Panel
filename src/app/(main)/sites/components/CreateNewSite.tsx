import SharedButton, { ButtonType } from "@/Shared/SharedButton";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import Joi from "joi";
import useForm from "@/components/common/FormControl/Form";
import styled from "styled-components";
import { SectionTitle } from "@/Shared/Styles";
import { newSite } from "@/services/siteService";
import { generateInitialState } from "types/WebsiteModel";

type NewSiteType = {
  url: string;
};

const CreateNewSite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data: NewSiteType = { url: "" };
  const [errors, setErrors] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);

  const joiSchema = Joi.object<NewSiteType>({
    url: Joi.string().min(3).required().label("Url"),
  });

  const doSubmit = async (data: NewSiteType) => {
    try {
      // Make Api request with data
      const siteData = generateInitialState(data.url);
      await newSite(siteData);
      setErrors("");
      setSuccess(true);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  const { renderButton, renderInput, handleSubmit } = useForm<NewSiteType>({
    initialData: data,
    joiSchema,
    doSubmit,
  });

  return (
    <div>
      <SharedButton
        buttonType={ButtonType.PRIMARY}
        label='Ny sida'
        handleClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {success ? (
          <div>
            New site with the name {data.url} was created, congratz! Get that
            moneyyy yoo$$${" "}
          </div>
        ) : (
          <>
            <SectionTitle>Create new website</SectionTitle>
            <Form onSubmit={handleSubmit}>
              {renderInput("url", "Url", "")}
              {renderButton("Submit")}
              {errors && <h4 className='register-errorresponse'>{errors}</h4>}
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
`;

export default CreateNewSite;
