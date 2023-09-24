'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import styled from 'styled-components';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorContainer>
      <h2>Något gick fel med anroppet till databasen...</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Försök igen
      </button>
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
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .error-message {
    color: red;
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
`;
