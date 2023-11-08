import { NextResponse } from 'next/server';
import auth from './services/authService';

export default async function authMiddleware(request: NextResponse) {
  // Add your own logic here to check if the user is authenticated

  return NextResponse.next();
}
