import express, { Request, Response } from "express";
import { validateFile as validate, File } from "../../model/Upload";
import auth from "src/middleware/auth";
import { FileUploadTypes } from "../../../../types/Upload";

import sharp from "sharp";
import path from "path";
import { minioClient, upload } from "./lib/Helper";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  const fileType = file?.mimetype.split("/")[0];

  if (fileType !== "image") {
    return res.status(400).json({ message: "Uploaded file is not an image." });
  }
  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const bucketName = "mediapartners";
  const { name } = path.parse(file.originalname);
  const uid = require("crypto").randomBytes(12).toString("hex"); // Generate a random uid64 number for the image
  const fileName = `siteimages/something/${uid}-${name}.webp`;
  const webpBuffer = await sharp(file.buffer) // Convert image to webp and compress it
    .webp({ quality: 85 })
    .toBuffer();

  // List objects in the specified path
  var stream = minioClient.listObjects(bucketName, "", true);
  stream.on("data", function (obj) {
    console.log(obj);
  });
  stream.on("end", function (obj: any) {});
  stream.on("error", function (err) {
    console.log(err);
  });
  // Upload the file to MinIO
  minioClient.putObject(bucketName, fileName, webpBuffer, (err, etag) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading file to MinIO.", err });
    }
    const fileUrl = `http://${process.env.MINIO_END_POINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;

    // Add tags after the object has been uploaded
    const tags = {
      originalFileName: name,
    };
    minioClient.setObjectTagging(bucketName, fileName, tags, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Tags set successfully");
    });

    return res.status(200).json({ success: true, message: fileUrl });
  });
});

router.delete("/");

// TODO: Add authentication (user, admin)
router.get("/", auth, async (req: Request, res: Response) => {
  return res.status(200).send();
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
