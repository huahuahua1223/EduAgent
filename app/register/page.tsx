import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "注册 - EduAgent",
  description: "创建您的EduAgent账号",
};

export default async function RegisterPage() {
  // 检查用户是否已登录
  const session = await getServerSession(authOptions);

  if (session) {
    // 已登录用户重定向到主页
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
} 