import { RolesEmun } from "../enums/roles";

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}
export interface ProtectedRoute {
  title: string;
  url: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any;
  role: RolesEmun[];
}
export interface UserData {
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    profilePicture: string | null;
  };
}

export interface AuthCredentials {
  email: string;
  user: string;
}
