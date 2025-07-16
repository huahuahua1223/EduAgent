/**
 * 课件详情页面
 * 
 * 功能：
 * - 展示课件的详细信息
 * - 提供编辑和导出功能
 * - 显示结构化的课件内容
 * 
 * 权限：
 * - 仅限教师角色访问
 * - 只能查看自己创建的课件
 */

import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExportButton from "@/components/teacher/ExportButton";

export default async function LessonPlanDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  // 验证教师权限
  if (!session || session.user.role !== "TEACHER") {
    redirect("/unauthorized");
  }
  
  try {
    // 获取课件数据
    const lessonPlan = await prisma.lessonPlan.findUnique({
      where: { 
        id: parseInt(params.id),
        teacherId: parseInt(session.user.id) // 确保只能查看自己的课件
      }
    });
    
    // 课件不存在或不是此教师创建的
    if (!lessonPlan) {
      notFound();
    }
    
    // 解析课件内容，添加错误处理
    let parsedContent = { sections: [] };
    try {
      if (lessonPlan.content) {
        parsedContent = JSON.parse(lessonPlan.content);
      }
    } catch (error) {
      console.error("解析课件内容失败:", error);
      // 如果解析失败，使用默认空内容
    }
    
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{lessonPlan.title}</h1>
          <div className="flex space-x-2">
            <Link href={`/dashboard/teacher/lesson-plans/${params.id}/edit`}>
              <Button>编辑课件</Button>
            </Link>
            <ExportButton 
              fileName={lessonPlan.title} 
              content={lessonPlan.content || "{}"} 
            />
          </div>
        </div>
        
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">学科</h3>
              <p>{lessonPlan.subject}</p>
            </div>
            
            {lessonPlan.tags && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">标签</h3>
                <p>{lessonPlan.tags}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">创建时间</h3>
              <p>{new Date(lessonPlan.createdAt).toLocaleString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">最后更新</h3>
              <p>{new Date(lessonPlan.updatedAt).toLocaleString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">发布状态</h3>
              <p>{lessonPlan.isPublished ? '已发布' : '草稿'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">课件内容</h2>
          <div className="prose max-w-none">
            {parsedContent.sections && parsedContent.sections.length > 0 ? (
              parsedContent.sections.map((section: any, idx: number) => (
                <div key={idx} className="mb-4">
                  {section.type === "heading" ? (
                    <h3 className="text-lg font-bold border-b pb-2">{section.content}</h3>
                  ) : (
                    <div className="whitespace-pre-line pl-4">{section.content}</div>
                  )}
                </div>
              ))
            ) : (
              <p>课件内容为空</p>
            )}
          </div>
        </Card>
        
        <div className="mt-6">
          <Link href="/dashboard/teacher/lesson-plans">
            <Button variant="outline">返回列表</Button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("加载课件详情失败:", error);
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-red-500">加载课件失败</h2>
          <p className="mt-4">无法加载课件内容，请返回重试。</p>
          <div className="mt-6">
            <Link href="/dashboard/teacher/lesson-plans">
              <Button variant="outline">返回列表</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
} 