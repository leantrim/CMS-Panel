import { faBrowser, faGear, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styled from 'styled-components';
import { WebsiteModel } from 'types/WebsiteModel';
import { useState } from 'react';
import { faMobileAlt } from '@fortawesome/pro-solid-svg-icons';
import { faDesktop } from '@fortawesome/sharp-solid-svg-icons';
import DeleteSite from './DeleteSite';
import { SiteTitle } from '@/Shared/Styles';
import style from '@/Style';

type Props = {
  site: WebsiteModel;
};

const DisplaySite = (props: Props) => {
  const { site } = props;
  const [sitePreview, setSitePreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteSite = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <DeleteSite site={site} isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} />
      <SiteContainer key={site._id} ismobile={isMobile}>
        <TopContainer>
          <SiteTitle>{site.url}</SiteTitle>
          <IconContainer>
            <FontAwesomeIcon icon={faBrowser} onClick={() => setSitePreview(!sitePreview)} />
            <Link href={`/websiteconfigurator/${site._id}`} key={site._id}>
              <FontAwesomeIcon icon={faGear} />
            </Link>
            <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteSite()} />
          </IconContainer>
        </TopContainer>

        {sitePreview && (
          <IframeContainer>
            <iframe
              src={`https://${site.url}`}
              title={site.url}
              style={{ width: isMobile ? '400px' : '100%', height: '500px' }}
            />
            <IframeIconContainer>
              <FontAwesomeIcon icon={faMobileAlt} onClick={() => setIsMobile(true)} />
              <FontAwesomeIcon icon={faDesktop} onClick={() => setIsMobile(false)} />
            </IframeIconContainer>
          </IframeContainer>
        )}
      </SiteContainer>
    </>
  );
};

type FrameProps = {
  ismobile: boolean;
};

const IframeIconContainer = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: grey;
  padding-top: 12px;
  display: flex;
  gap: 12px;
`;

const IframeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconContainer = styled.div`
  font-size: 24px;
  display: flex;
  gap: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
`;

const SiteContainer = styled.div<FrameProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
`;

export default DisplaySite;
