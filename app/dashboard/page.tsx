import { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "仪表盘 - EduAgent",
  description: "EduAgent 用户仪表盘",
};

export default async function DashboardPage() {
  // 验证用户是否已登录
  const user = await requireAuth();

  // 根据用户角色显示不同内容
  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case "ADMIN":
        return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">管理员控制台</h2>
            <p className="text-gray-600 mb-4">
              欢迎访问管理员控制台。您可以管理用户、课程和系统设置。
            </p>
            <div className="flex space-x-4">
              <Link href="/admin/users">
                <Button variant="default">管理用户</Button>
              </Link>
              <Link href="/admin/courses">
                <Button variant="outline">管理课程</Button>
              </Link>
            </div>
          </div>
        );
      case "TEACHER":
        return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">教师控制台</h2>
            <p className="text-gray-600 mb-4">
              欢迎访问教师控制台。您可以管理您的课程、创建教学资源和查看学生进度。
            </p>
            <div className="flex space-x-4">
              <Link href="/teacher/courses">
                <Button variant="default">管理课程</Button>
              </Link>
              <Link href="/teacher/resources">
                <Button variant="outline">教学资源</Button>
              </Link>
            </div>
          </div>
        );
      case "STUDENT":
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">学生仪表盘</h2>
            <p className="text-gray-600 mb-4">
              欢迎回来！您可以继续学习课程、完成作业和参加练习。
            </p>
            <div className="flex space-x-4">
              <Link href="/courses">
                <Button variant="default">我的课程</Button>
              </Link>
              <Link href="/practice">
                <Button variant="outline">练习题</Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">欢迎回来，{user.name}</h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      {renderRoleSpecificContent()}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">最近活动</h2>
          <div className="space-y-4">
            <p className="text-gray-500 italic">暂无最近活动记录</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">公告</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">平台更新通知</h3>
              <p className="text-gray-600 text-sm">
                EduAgent平台已完成最新版本更新，增加了更多功能和优化了用户体验。
              </p>
              <p className="text-gray-400 text-xs mt-1">2023年6月1日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 