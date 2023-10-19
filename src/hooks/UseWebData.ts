'use client';
import { WebsiteModel, generateInitialState } from '@mediapartners/shared-types/types/panel/cms/WebsiteModel';
import { useState } from 'react';

export const useWebData = () => {
  const [webData, setWebData] = useState<WebsiteModel>(generateInitialState);

  const updateWebData = (key: keyof WebsiteModel, fieldKey: keyof WebsiteModel | null, value: any, index?: number) => {
    setWebData((prevWebData) => {
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
    setWebData((prevWebData) => {
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

  return { webData, updateWebData, addData, deleteData };
};
