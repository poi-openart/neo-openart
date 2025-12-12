import { clerkClient } from "@clerk/nextjs/server";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const { hostname } = new URL(process.env.NEXTAUTH_URL!);

let ROOT_DOMAIN = hostname;

function isTestingEnv() {
  return (
    hostname.endsWith("appspot.com") ||
    hostname.endsWith("run.app") ||
    process.env.NEXT_PUBLIC_ENV === "testing"
  );
}
if (!isTestingEnv()) {
  ROOT_DOMAIN = hostname.split(".").reverse().splice(0, 2).reverse().join(".");
}
const isSecure = process.env.NODE_ENV !== "development";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email || "";
        const emailToLowerCase = email.toLowerCase();
        const password = credentials?.password || "";

        const clerk = await clerkClient();

        const { data } = await clerk.users.getUserList({
          emailAddress: [emailToLowerCase],
        });

        if (data.length === 0) {
          throw new Error("Email or Password is incorrect");
        }

        const verifyPassword = await clerk.users.verifyPassword({
          userId: data[0].id,
          password,
        });

        if (!verifyPassword) {
          throw new Error("Email or Password is incorrect");
        }

        return {
          id: data[0].id,
          name: data[0].firstName,
          email: emailToLowerCase,
        };
      },
    }),
  ],
  adapter: FirestoreAdapter(),
  pages: {
    signIn: "/signin",
  },
  session: {
    // https://next-auth.js.org/configuration/options#session
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: isSecure
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: `.${ROOT_DOMAIN}`, // Note the dot
        secure: true,
      },
    },
  },
});

export { handler as GET, handler as POST };
