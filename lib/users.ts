import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 创建新用户
 */
export async function createUser(
  email: string,
  name: string,
  password: string,
  role: "STUDENT" | "TEACHER" | "ADMIN" = "STUDENT"
) {
  // 检查邮箱是否已被注册
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("邮箱已被注册");
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, 12);

  // 创建用户
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  // 返回不含密码的用户信息
  const { password: _pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * 根据ID获取用户
 */
export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  const { password: _pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * 获取所有用户
 */
export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
} 