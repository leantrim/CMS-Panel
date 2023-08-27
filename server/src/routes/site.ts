import express, { Request, Response } from "express";
import { validateSite as validate, Site } from "../model/Site";
import auth from "../middleware/auth";
import { WebsiteModel } from "../../../types/WebsiteModel";
import admin from "../middleware/admin";

const router = express.Router();

// TODO: Add authentication once user system is setup in the CMS.
router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { site: url } = req.body;
  const existingSite = await Site.findOne({ url });
  if (existingSite)
    return res.status(400).send({ message: "site already exists", url });

  const site: WebsiteModel = new Site({ ...req.body });

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

// TODO: Add authentication
router.get("/", async (req: Request, res: Response) => {
  const sites = await Site.find();
  if (!sites) return res.status(404).send("No sites have been created");

  return res.status(200).send(sites);
});

router.get("/site", auth, async (req: Request, res: Response) => {
  const site = await Site.findById(req.body.site._id);
  return res.send(site);
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
