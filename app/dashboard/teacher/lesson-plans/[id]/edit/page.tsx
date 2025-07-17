/**
 * 编辑课件页面
 * 
 * 功能：
 * - 加载指定ID的课件数据
 * - 提供课件编辑界面
 * - 调用EditLessonPlan组件处理编辑和保存
 * 
 * 权限：
 * - 仅限教师角色访问
 * - 只能编辑自己创建的课件
 */

import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EditLessonPlan from "@/components/teacher/EditLessonPlan";

export default async function EditLessonPlanPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  // 验证教师权限
  if (!session || session.user.role !== "TEACHER") {
    redirect("/unauthorized");
  }
  
  // 获取课件数据
  const lessonPlan = await prisma.lessonPlan.findUnique({
    where: { 
      id: parseInt(params.id),
      teacherId: parseInt(session.user.id) // 确保只能编辑自己的课件
    }
  });
  
  // 课件不存在或不是此教师创建的
  if (!lessonPlan) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">编辑课件 - {lessonPlan.title}</h1>
      <EditLessonPlan lessonPlan={lessonPlan} />
    </div>
  );
} 