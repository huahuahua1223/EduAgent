import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "页面未找到 - EduAgent",
  description: "您访问的页面不存在",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">页面未找到</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button variant="default" size="lg">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}