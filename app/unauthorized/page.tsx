import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "访问被拒绝 - EduAgent",
  description: "您没有权限访问该页面",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 text-center sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">访问被拒绝</h2>
          <p className="mt-2 text-sm text-gray-600">
            您没有权限访问请求的页面
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link href="/dashboard">
            <Button variant="default" className="w-full">
              返回主页
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 