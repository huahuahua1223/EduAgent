"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // 根据不同角色显示不同导航
  const renderNavLinks = () => {
    if (!session) {
      return (
        <>
          <Link
            href="/login"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/login"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            登录
          </Link>
          <Link
            href="/register"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/register"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            注册
          </Link>
        </>
      );
    }

    // 所有角色共有的链接
    const commonLinks = (
      <>
        <Link
          href="/dashboard"
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pathname === "/dashboard"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          首页
        </Link>
        <Link
          href="/courses"
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pathname.startsWith("/courses")
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          课程
        </Link>
      </>
    );

    // 根据角色添加特定链接
    switch (session.user.role) {
      case "ADMIN":
        return (
          <>
            {commonLinks}
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/admin")
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              管理控制台
            </Link>
          </>
        );
      case "TEACHER":
        return (
          <>
            {commonLinks}
            <Link
              href="/dashboard/teacher/lesson-plans"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/dashboard/teacher/lesson-plans")
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              备课与设计
            </Link>
            <Link
              href="/teacher"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/teacher")
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              教师控制台
            </Link>
          </>
        );
      case "STUDENT":
      default:
        return (
          <>
            {commonLinks}
            <Link
              href="/practice"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/practice")
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              练习
            </Link>
          </>
        );
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-xl font-bold">
                EduAgent
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {renderNavLinks()}
              </div>
            </div>
          </div>

          {/* 用户菜单 */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session ? (
                <div className="relative ml-3">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
                  >
                    <span className="mr-2">
                      {session.user.name || session.user.email}
                    </span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {menuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        个人资料
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">打开主菜单</span>
              {menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {renderNavLinks()}
        </div>
        
        {/* 登录用户信息 */}
        {session && (
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {session.user.name || "用户"}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {session.user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                个人资料
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                退出登录
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 