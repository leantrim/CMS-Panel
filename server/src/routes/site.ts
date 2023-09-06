import express, { Request, Response } from "express";
import { validateSite as validate, Site } from "../model/Site";
import auth from "../middleware/auth";
import { WebsiteModel } from "../../../types/WebsiteModel";
import admin from "../middleware/admin";
import mongoose from "mongoose";

const router = express.Router();
router.put("/", auth, async (req: Request, res: Response) => {
  const { user, ...webData } = req.body;
  console.log(webData);
  const { error } = validate(webData);
  if (error) return res.status(400).send(error.message);

  const { url } = webData;
  const existingSite = await Site.findOne({ url });
  if (!existingSite)
    return res.status(400).send({ message: "site does not exist", url });

  try {
    const updatedSite = await Site.findByIdAndUpdate(webData._id, webData);
    return res.status(200).send(updatedSite);
  } catch (err) {
    console.error(
      "ERROR: Something went wrong with updating a website, please contact administrator and include this error:",
      err
    );
    return res.status(500).send(err);
  }
});

router.get("/", auth, async (req: Request, res: Response) => {
  const sites = await Site.find();
  if (!sites) return res.status(404).send("No sites have been created");

  return res.status(200).send(sites);
});

router.get("/sitebyname/:id", auth, async (req, res) => {
  const site: any = await Site.findOne({ url: req.params.id });
  console.log(req.params.id);

  if (!site)
    return res.status(404).send("The site with the given id was not found");

  return res.send(site);
});

router.get("/:id", auth, async (req, res) => {
  const site: any = await Site.findById(req.params.id);
  console.log(site, req.params.id);

  if (!site)
    return res.status(404).send("The site with the given id was not found");

  return res.send(site);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  const { user, ...webData } = req.body;
  if (error) return res.status(400).send(error.message);
  const existingSite: WebsiteModel | null = await Site.findOne({
    url: webData.url,
  });
  if (existingSite)
    return res.status(400).send(`Hemsidan finns redan: ${webData.url}`);

  // Check if the URL is reachable
  /* const buildUrl = `https://${req.body.web.url}`;
  try {
    await fetch(buildUrl);
  } catch (error) {
    return res
      .status(400)
      .send(`Hemsidan ej nårbar. Är den upplagd på panelen?: ${buildUrl}`);
  }*/
  console.log(webData);
  const site: WebsiteModel = new Site({
    _id: new mongoose.Types.ObjectId(),
    ...webData,
  });

  try {
    await site.save();
    return res.status(200).send(site);
  } catch (err) {
    console.error(
      "ERROR: Something went wrong with creating a website, please contact administrator and include this error:",
      err
    );
    return res.status(500).send(err);
  }
});

/*const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (mail: string) => {
  const msg = {
    to: `${mail}`, // Change to your recipient
    from: "voip2g@voiplay.se", // Change to your verified sender
    subject: "Tack för att du registrerar dig",
    text: "thank you for registering, here is your code HBF539",
    html: "<strong>Tack för att du har valt att registrera ett konto hos oss :)</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: string) => {
      console.error(error);
    });
};
*/
export default router;
