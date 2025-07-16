import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.password) {
          throw new Error('用户不存在');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('密码不正确');
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

/**
 * 获取当前会话
 */
export const getSession = async () => {
  return await getServerSession(authOptions);
};

/**
 * 获取当前登录用户
 */
export const getCurrentUser = async () => {
  const session = await getSession();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

/**
 * 检查用户是否已登录，未登录则重定向到登录页
 */
export const requireAuth = async () => {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect("/login");
  }

  return user;
};

/**
 * 检查用户是否具有指定角色
 */
export const requireRole = async (allowedRoles: string[]) => {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.role)) {
    return redirect("/unauthorized");
  }

  return user;
}; 