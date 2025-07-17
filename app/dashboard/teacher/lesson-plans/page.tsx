/**
 * 教师备课列表页面
 * 
 * 功能：
 * - 展示教师已创建的所有备课课件
 * - 提供创建新备课的入口
 * - 集成课件列表组件，支持查看、编辑和删除操作
 * 
 * 权限：
 * - 仅限教师角色访问
 */

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import LessonPlanList from "@/components/teacher/LessonPlanList";

export default async function LessonPlansPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "TEACHER") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">备课与设计</h1>
        <Link href="/dashboard/teacher/lesson-plans/new">
          <Button>创建新备课</Button>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">备课管理</h2>
        <p className="mb-4">在这里您可以管理已创建的所有课件，包括查看、编辑和删除操作。您也可以按学科筛选课件。</p>
      </div>
      
      {/* 使用课件列表组件 */}
      <LessonPlanList />
    </div>
  );
} 