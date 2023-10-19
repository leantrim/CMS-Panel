'use client';
import {
  WebsiteModel,
  ContactInfo,
  Services,
  generateInitialState,
} from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type WebDataMethods = {
  updateWebData: (
    key: keyof WebsiteModel,
    fieldKey: keyof (ContactInfo & Services) | null,
    value: any,
    index?: number | undefined,
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
    fieldKey: keyof (ContactInfo & Services) | null,
    value: any,
    index?: number | undefined,
  ) => {},
  addData: (key: keyof WebsiteModel, data?: any) => {},
  deleteData: (key: keyof WebsiteModel, index: number) => {},
  webData: { ...initialState },
  setWebData: (value: WebsiteModel) => value,
});

export const WebDataProvider = ({ children }: { children: ReactNode }) => {
  const [webData, setWebData] = useState<WebsiteModel>(initialState);

  const updateWebData = (
    key: keyof WebsiteModel,
    fieldKey: keyof (ContactInfo & Services) | null,
    value: any,
    index?: number,
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
        const newData = (prevWebData[key] as Array<any>).filter((_, i) => i !== index);
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
