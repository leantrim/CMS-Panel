'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../Shared/Styles';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorContainer>
      <h2>Något gick fel....</h2>
      <ResetButton
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Försök igen
      </ResetButton>
      <ErrorMessage>
        Felmeddelande
        <span className="error-message">
          {error.name}: {error.message}
        </span>
      </ErrorMessage>
    </ErrorContainer>
  );
}

const ErrorMessage = styled.div`
  background-color: ${theme.primary};
  padding: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: var(--border-radius);
  .error-message {
    color: white;
    font-weight: bold;
    font-size: 1em;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 28px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius);
  background-color: ${theme.secondary};
  color: white;
  font-size: 1em;
  cursor: pointer;
  :hover {
    background-color: ${theme.primary};
  }
`;
