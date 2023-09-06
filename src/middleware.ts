"use client";
import { NextResponse } from "next/server";
import auth from "./services/authService";

export default function authMiddleware(req: NextResponse) {
  // Add your own logic here to check if the user is authenticated
  const isUserAuthenticated = auth.getCurrentUser();

  //if (!isUserAuthenticated) {
  //return NextResponse.rewrite(new URL("/login", req.url));
  //}

  return NextResponse.next();
}
