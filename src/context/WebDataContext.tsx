"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  SiteProperty,
  WebsiteModel,
  generateInitialState,
} from "@/types/WebsiteModel";

export type WebDataMethods = {
  updateWebData: (
    key: keyof WebsiteModel,
    fieldKey: keyof SiteProperty | null,
    value: any,
    index?: number | undefined
  ) => void;
  addData: (key: keyof WebsiteModel, data?: any) => void;
  deleteData: (key: keyof WebsiteModel, index: number) => void;
  webData: WebsiteModel;
  setWebData: (value: WebsiteModel) => void;
};

const initialState = generateInitialState();

const WebDataContext = createContext<WebDataMethods>({
  updateWebData: (
    key: keyof WebsiteModel,
    fieldKey: keyof SiteProperty | null,
    value: any,
    index?: number | undefined
  ) => {},
  addData: (key: keyof WebsiteModel, data?: any) => {},
  deleteData: (key: keyof WebsiteModel, index: number) => {},
  webData: { ...initialState },
  setWebData: (value: WebsiteModel) => value,
});

export const WebDataProvider = ({ children }: { children: ReactNode }) => {
  const [webData, setWebData] = useState<WebsiteModel>(generateInitialState);

  const updateWebData = (
    key: keyof WebsiteModel,
    fieldKey: keyof SiteProperty | null,
    value: any,
    index?: number
  ) => {
    setWebData((prevWebData: WebsiteModel) => {
      let updatedData = { ...prevWebData };
      if (index !== undefined) {
        if (Array.isArray(updatedData[key])) {
          const newData = [...(updatedData[key] as Array<any>)];
          if (fieldKey !== null) {
            newData[index] = { ...newData[index], [fieldKey]: value };
          } else {
            newData[index] = value;
          }
          updatedData = { ...updatedData, [key]: newData };
        }
      } else {
        updatedData = { ...updatedData, [key]: value };
      }
      return updatedData;
    });
    console.log(value, key, fieldKey, "UPDATE?");
  };

  const addData = (key: keyof WebsiteModel, data?: any) => {
    setWebData((prevWebData: WebsiteModel) => {
      if (Array.isArray(prevWebData[key])) {
        return {
          ...prevWebData,
          [key]: [...(prevWebData[key] as any[]), data],
        };
      }
      return prevWebData;
    });
  };

  const deleteData = (key: keyof WebsiteModel, index: number) => {
    setWebData((prevWebData) => {
      if (Array.isArray(prevWebData[key])) {
        const newData = (prevWebData[key] as Array<any>).filter(
          (_, i) => i !== index
        );
        return { ...prevWebData, [key]: newData };
      }
      return prevWebData;
    });
  };

  return (
    <WebDataContext.Provider
      value={{
        webData,
        setWebData,
        updateWebData,
        addData,
        deleteData,
      }}
    >
      {children}
    </WebDataContext.Provider>
  );
};

export const useSharedWebData = (): WebDataMethods => {
  return useContext(WebDataContext);
};
