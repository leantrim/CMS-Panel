import Joi from "joi";
import mongoose, { Schema, Model } from "mongoose";
import "mongoose-type-email";
import { WebsiteModel, InfoType, Services } from "types";

const siteSchema: Schema<WebsiteModel> = new mongoose.Schema({
  metaTitle: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  aboutUs: { type: String, required: true },
  bodyTexts: [
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  services: [
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
      metaTitle: { type: String, required: true },
      metaDescription: { type: String, required: true },
      imageUrl: { type: String, required: false },
    },
  ],
  contactInfo: {
    email: { type: String, required: true },
    address: { type: String, required: true },
    companyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
});

const Site: Model<WebsiteModel> = mongoose.model("Site", siteSchema);

function validateSite(site: WebsiteModel) {
  const schema = Joi.object<WebsiteModel>({
    metaTitle: Joi.string().required(),
    url: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    primaryColor: Joi.string().required(),
    secondaryColor: Joi.string().required(),
    aboutUs: Joi.string().required(),
    bodyTexts: Joi.array()
      .items(
        Joi.object<InfoType>({
          title: Joi.string().required(),
          text: Joi.string().required(),
        })
      )
      .required(),
    services: Joi.array()
      .items(
        Joi.object<Services>({
          title: Joi.string().required(),
          text: Joi.string().required(),
          metaTitle: Joi.string().required(),
          metaDescription: Joi.string().required(),
          imageUrl: Joi.string(),
        })
      )
      .required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      address: Joi.string().required(),
      companyName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    }).required(),
  });

  return schema.validate(site);
}

export { validateSite, Site };
