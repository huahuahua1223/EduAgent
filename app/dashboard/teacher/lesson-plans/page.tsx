import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

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
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">开始新备课</h2>
          <p className="mb-4">创建一个新的课件，使用AI辅助快速生成教学内容，包括教学目标、重点难点和教学流程。</p>
          <Link href="/dashboard/teacher/lesson-plans/new">
            <Button variant="outline" className="mt-2">开始备课</Button>
          </Link>
        </div>
        
        {/* 此处在实际项目中应添加课件列表组件 */}
        {/* <LessonPlanList /> */}
        <p className="text-center text-gray-500 my-10">备课列表功能开发中，敬请期待...</p>
      </div>
    </div>
  );
} 