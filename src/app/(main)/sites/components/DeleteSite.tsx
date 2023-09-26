import Modal from '@/components/common/Modal';
import { WebsiteModel } from 'types/WebsiteModel';
import { useState } from 'react';
import SharedButton, { ButtonType } from '@/Shared/SharedButton';
import styled from 'styled-components';
import { SectionSubTitle, SiteTitle } from '@/Shared/Styles';

type Props = {
  site: WebsiteModel;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (value: boolean) => void;
};

const DeleteSite = (props: Props) => {
  const { isDeleteModalOpen, site, setIsDeleteModalOpen } = props;

  return (
    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <Container>
        <SectionSubTitle>
          Are you sure you want to delete{' '}
          <SiteTitle style={{ color: 'grey', fontSize: '24px', textTransform: 'uppercase' }}>{site.url}</SiteTitle>
        </SectionSubTitle>
        <ButtonContainer>
          <SharedButton buttonType={ButtonType.WARNING} handleClick={() => console.log('Clicked!')} label="Delete" />
          <SharedButton buttonType={ButtonType.PRIMARY} handleClick={() => console.log('Clicked!')} label="Avbryt" />
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Container = styled.div`
  height: 30vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default DeleteSite;
