import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  ...authConfig,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          ...user,
          emailVerified: null,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
