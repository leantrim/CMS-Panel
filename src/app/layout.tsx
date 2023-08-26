"use client";
import "./globals.css";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "styled-components";
import { theme } from "@/Shared/Styles";
import { WebDataProvider } from "@/context/WebDataContext";

const robot = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Media Partners - CMS",
  description: "Content Managment System - Media Partners AB @2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={robot.className}>
      <StyledComponentsRegistry>
        <body>
          <ThemeProvider theme={theme}>
            <WebDataProvider>
              <Header />
              {children}
              <Footer />
            </WebDataProvider>
          </ThemeProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
