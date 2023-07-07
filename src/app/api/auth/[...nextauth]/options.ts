import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../../prisma/client";
import type { Adapter } from "next-auth/adapters";

const Siteurl = process.env.NEXT_URL || 'http://localhost:3000';
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your cool username",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter a strong password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${Siteurl}/api/checkusers`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
};
