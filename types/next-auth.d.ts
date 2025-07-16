import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * 扩展默认的session类型，包含用户ID和角色
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  /**
   * 扩展用户类型，包含角色信息
   */
  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * 扩展JWT类型，包含用户ID和角色
   */
  interface JWT {
    id: string;
    role: string;
  }
} 