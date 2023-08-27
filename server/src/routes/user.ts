import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateUser as validate, User } from "../model/User";
import auth from "../middleware/auth";
import { UserType } from "../../../types/UserType";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).send("Email is already registered");

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
  const user: UserType = new User({ ...req.body, password: hashedPassword });

  try {
    await user.save();
    const token = user.generateAuthToken();
    return res.send(token);
  } catch (err) {
    console.error(
      "ERROR: Something went wrong with registering a user, please contact administrator and include this error:",
      err
    );
    return res.status(500).send(err);
  }
});

router.get("/me", auth, async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id).select("-password");
  return res.send(user);
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
