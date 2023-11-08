import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  onImageUpdate: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  siteUrl: string;
};

function FileUpload(props: Props) {
  const { title, onImageUpdate, value, siteUrl } = props;

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(value ?? '');
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('siteUrl', siteUrl);

      fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setImageUrl(data.message);
            onImageUpdate(data.message);
            setError('');
            setFile(null);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setError(error.toString());
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleDeleteImage = () => {
    setImageUrl('');
    setFile(null);
  };

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  return (
    <UploadContainer>
      <h1>{title}</h1>
      <Form>
        <UploadInput type="file" onChange={handleFileChange} />
        {error && <div>{error}</div>}
        {(imageUrl || file) && !error && (
          <UploadImageContainer
            onMouseEnter={() => setShowCloseButton(true)}
            onMouseLeave={() => setShowCloseButton(false)}
            onClick={() => handleDeleteImage()}
          >
            <UploadImage
              src={file ? URL.createObjectURL(file) : imageUrl || ''}
              alt="Uploaded file"
              width={500}
              height={500}
              priority
            />
            {showCloseButton && <CloseButton onClick={() => handleDeleteImage()}>X</CloseButton>}
          </UploadImageContainer>
        )}
        <UploadButton onClick={() => startTransition(() => handleUpload())} disabled={!Boolean(file)}>
          {isPending ? 'Filen laddas upp...' : 'Ladda upp'}
        </UploadButton>
      </Form>
    </UploadContainer>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadInput = styled.input`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  padding: 6px;
  text-align: center;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #a2d5a2;
    cursor: not-allowed;
  }
`;

const UploadImageContainer = styled.div`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const UploadImage = styled(Image)`
  margin-top: 20px;
  max-width: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 118px;
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
`;

const LoadingText = styled.p`
  margin-top: 10px;
`;

export default FileUpload;
