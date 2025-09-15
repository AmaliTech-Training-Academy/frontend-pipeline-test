/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { R } from "vitest/dist/chunks/environment.d.cL3nLXbE.js";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      role: RolesEmun;
      profilePicture: string | null;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: RolesEmun;
    profilePicture: string | null;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // id: string;
    // username: string;
    // fullName: string;
    // email: string;
    // role: string;
    // profilePicture: string | null;
    user: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      role: RolesEmun;
      profilePicture: string | null;
      emailVerified: Date | null;
    };
  }
}
