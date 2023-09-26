export type WebsiteModel = {
  title: string;
  url: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  aboutUs: string;
  bodyTexts: InfoType[];
  services: Services[];
  contactInfo: ContactInfo;
  imageUrl: string;
  save?: any;
  toObject?: any;
  _id?: string;
  __v?: number;
} & MetaProps;

export enum WebsiteModelKeys {
  Url = 'url',
  Favicon = 'favicon',
  PrimaryColor = 'primaryColor',
  SecondaryColor = 'secondaryColor',
  Email = 'email',
  Address = 'address',
  ServiceDescription = 'serviceDescription',
  AboutUs = 'aboutUs',
  Bodys = 'bodyTexts',
  Services = 'services',
  ContactInfo = 'contactInfo',
  ImageUrl = 'imageUrl',
  MetaTitle = 'metaTitle',
  MetaDescription = 'metaDescription',
}

export enum SitePropertyModelKey {
  Title = 'title',
  Text = 'text',
  MetaDescription = 'metaDescription',
  MetaTitle = 'metaTitle',
  ImageUrl = 'imageUrl',
  SecondaryDescription = 'secondaryDescription',
  Email = 'email',
  Address = 'address',
  CompanyName = 'companyName',
  PhoneNumber = 'phoneNumber',
}

export type ContactInfo = {
  email: string;
  address: string;
  companyName: string;
  phoneNumber: string;
};

export type Services = {
  metaTitle: string;
  metaDescription: string;
  imageUrl: string;
} & InfoType;

export enum MetaKeys {
  MetaTitle = 'metaTitle',
  MetaDescription = 'metaDescription',
}

export type InfoType = {
  title: string;
  text: string;
};

export type SiteProperty = Services & ContactInfo;

type MetaProps = {
  metaTitle: string;
  metaDescription: string;
};

export const generateInitialState = (site = ''): WebsiteModel => ({
  url: site,
  title: 'Städhjälp Malmö [GENERATE INITIAL]',
  metaTitle: 'Meta Title [GENERATE INITIAL]',
  metaDescription: 'Beskrivning [GENERATE INITIAL]',
  primaryColor: '#145bd7',
  secondaryColor: '#f8bd3b',
  aboutUs: 'Om oss',
  bodyTexts: Array(3).fill({ title: 'Title', text: 'Change this' }),
  imageUrl: '',
  favicon: '',
  services: Array(3).fill({
    title: 'Service Title',
    text: 'Service info',
    metaTitle: 'Meta title',
    metaDescription: 'meta description',
    imageUrl: 'url',
  }),
  contactInfo: {
    email: 'example@example.com',
    address: 'skirtvägen 13, 213 70 malmö',
    companyName: 'Media Partners AB',
    phoneNumber: '0731234545',
  },
});
