"use client";

import { SessionProvider } from "next-auth/react";

export interface HomePageProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: HomePageProps) {
  return <SessionProvider>{children}</SessionProvider>;
}