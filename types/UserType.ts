export interface UserType {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  generateAuthToken: () => string;
  save?: any;
  toObject?: any;
}
