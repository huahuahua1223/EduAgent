import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "EduAgent - 智能教育平台",
  description: "EduAgent是一个面向教师和学生的教育资源管理与学习平台",
};

export default function Home() {
  return (
    <div>
      {/* 英雄区域 */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              EduAgent 智能教育平台
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              一站式教育解决方案，让教与学变得更简单、更高效、更有趣
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link href="/login">
                <Button variant="default" size="lg">
                  立即登录
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg" className="bg-white">
                  注册账号
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特性展示 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              为什么选择 EduAgent
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              专为学生和教师设计的智能教育工具
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* 特性 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-md text-blue-600 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                丰富的学习资源
              </h3>
              <p className="text-gray-600">
                获取各种类型的学习资源，包括讲义、习题和视频，满足不同学习需求。
              </p>
            </div>

            {/* 特性 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-md text-green-600 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 9.293a1 1 0 00-1.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 14.586l3.293-3.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                个性化学习体验
              </h3>
              <p className="text-gray-600">
                智能分析学习进度和习题正确率，提供个性化学习建议和提升方案。
              </p>
            </div>

            {/* 特性 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-md text-purple-600 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                高效教学管理
              </h3>
              <p className="text-gray-600">
                教师可以轻松创建和管理课程、发布学习资源、布置和批改作业。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 呼叫行动区域 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            准备好开始了吗？
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            立即加入 EduAgent 平台，开启您的智能学习之旅。无论您是学生还是教师，
            我们都为您提供所需的一切工具。
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button variant="default" size="lg">
                免费注册
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
