import { createUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // 输入验证
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "请提供姓名、邮箱和密码" },
        { status: 400 }
      );
    }

    // 验证角色
    if (role && !["STUDENT", "TEACHER", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { message: "无效的用户角色" },
        { status: 400 }
      );
    }

    // 创建用户
    const user = await createUser(
      email,
      name,
      password,
      role as "STUDENT" | "TEACHER" | "ADMIN"
    );

    return NextResponse.json(
      {
        message: "注册成功",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("注册失败:", error);
    const errorMessage = error instanceof Error ? error.message : "注册失败";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
} 