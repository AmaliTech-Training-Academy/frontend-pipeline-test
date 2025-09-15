import { AuthCredentials, UserData } from "@/lib/types/user";
import { setDemoData } from "@/utils/constants/auth";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async credentials => {
        const { email, user: receivedUser } = credentials as AuthCredentials;
        const demoData = setDemoData(email);
        if (demoData) return demoData;
        const user: UserData["user"] = JSON.parse(receivedUser);
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
