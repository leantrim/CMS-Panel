'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import Header from '@/components/Header';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/Shared/Styles';
import SideBar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import auth from '../services/authService';
import Loading from './loading';
import { ReduxProvider } from '@/redux/prodiver';

const robot = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'Media Partners - CMS',
  description: 'Content Managment System - Media Partners AB @2023',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isUserAuthenticated = auth.getCurrentUser();

  useEffect(() => {
    if (!isUserAuthenticated) {
      router.replace('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <html className={robot.className}>
      <StyledComponentsRegistry>
        <body>
          <ThemeProvider theme={theme}>
            <Header />
            <MainContainer>
              <SideBar isLoggedIn={isLoggedIn} />
              <Suspense fallback={<Loading />}>
                <ReduxProvider>{children}</ReduxProvider>
              </Suspense>
            </MainContainer>
          </ThemeProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  padding-top: 48px;
  height: 100%;
`;
