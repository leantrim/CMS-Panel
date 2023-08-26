import styled from "styled-components";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  primary: "#BF4F74",
  default: "white",
};

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    default: string;
  }
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0; // Light grey border for a cleaner look
  border-radius: 8px; // Rounded corners for a softer, nicer look
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  padding: 24px;
  gap: 8px;
  background-color: #fff; // White background for a clean look
  transition: all 0.3s ease; // Smooth transition for any changes
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0; // Light grey border for a cleaner look
  border-radius: 8px; // Rounded corners for a softer, nicer look
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  padding: 24px;
  background-color: #f5f5f5; // Light grey background for a clean look that matches with white
  transition: all 0.3s ease; // Smooth transition for any changes
`;

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoText = styled.span`
  font-size: 1em;
  color: #333;
  font-style: italic;
`;

export const SectionTitle = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const SectionSubTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
