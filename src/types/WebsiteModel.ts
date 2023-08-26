export type InfoType = {
  title: string;
  text: string;
};
export type SiteProperty = {
  metaDescription: string;
  metaTitle: string;
  imageUrl: string;
  secondaryDescription: string;
  email: string;
  address: string;
  companyName: string;
  phoneNumber: string;
} & InfoType;

export enum SitePropertyModelKey {
  Title = "title",
  Text = "text",
  MetaDescription = "metaDescription",
  MetaTitle = "metaTitle",
  ImageUrl = "imageUrl",
  SecondaryDescription = "secondaryDescription",
  Email = "email",
  Address = "address",
  CompanyName = "companyName",
  PhoneNumber = "phoneNumber",
}

export enum WebsiteModelKeys {
  MetaTitle = "metaTitle",
  Url = "url",
  Description = "description",
  PrimaryColor = "primaryColor",
  SecondaryColor = "secondaryColor",
  Email = "email",
  Address = "address",
  ServiceDescription = "serviceDescription",
  AboutUs = "aboutUs",
  Bodys = "bodyTexts",
  Services = "services",
  ContactInfo = "contactInfo",
}

export type WebsiteModel = {
  metaTitle: string;
  url: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  aboutUs: string;
  bodyTexts: InfoType[];
  services: SiteProperty[];
  contactInfo: {
    email: string;
    address: string;
    companyName: string;
    phoneNumber: string;
  };
};

export const generateInitialState = (): WebsiteModel => ({
  metaTitle: "Meta Title",
  url: "www.example.com",
  description: "Beskrivning",
  primaryColor: "#145bd7",
  secondaryColor: "#f8bd3b",
  aboutUs: "Om oss",
  bodyTexts: Array(3).fill({ title: "Title", text: "Change this" }),
  services: Array(3).fill({
    title: "Service Title",
    text: "Service info",
    metaTitle: "Meta title",
    metaDescription: "meta description",
    imageUrl: "url",
  }),
  contactInfo: {
    email: "example@example.com",
    address: "skirtvägen 13, 213 70 malmö",
    companyName: "Media Partners AB",
    phoneNumber: "0731234545",
  },
});
