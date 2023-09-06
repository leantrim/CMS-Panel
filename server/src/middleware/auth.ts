import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  /* Custom API key from Next JS Server Render */
  const bearerToken = req.header("authorization");
  if (bearerToken === process.env.BACKEND_API_KEY) {
    return next();
  }

  if (!process.env.JWT_SECRET) {
    console.error("ERROR: JWT Secret not set (auth middleware)");
    process.exit(1);
  }
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. You need to be logged in.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

export default auth;
