"use client";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * 提供认证状态的Context Provider
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider; 