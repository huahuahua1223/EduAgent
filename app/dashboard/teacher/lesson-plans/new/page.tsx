/**
 * 创建新备课页面
 * 
 * 功能：
 * - 提供创建新备课的表单界面
 * - 集成CreateLessonPlan组件，实现课件创建功能
 * - 支持AI辅助生成课件内容
 * 
 * 权限：
 * - 仅限教师角色访问
 */

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import CreateLessonPlan from "@/components/teacher/CreateLessonPlan";

export default async function NewLessonPlanPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "TEACHER") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">创建新备课</h1>
      <CreateLessonPlan />
    </div>
  );
} 