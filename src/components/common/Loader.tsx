'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader() {
  return (
    // <LoadingContainer>
    //   <SpinnerIcon icon={faSpinner} />
    // </LoadingContainer>
    <Skeleton count={5} />
  );
}
