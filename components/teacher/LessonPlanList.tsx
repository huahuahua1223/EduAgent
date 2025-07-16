/**
 * 备课列表组件
 * 
 * 功能：
 * - 从API获取教师创建的课件列表并展示
 * - 提供按学科筛选功能
 * - 支持查看、编辑和删除课件操作
 * - 处理空列表状态与加载状态
 * 
 * 使用：
 * - 在备课列表页面中引入
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// 定义课件类型
interface LessonPlan {
  id: number;
  title: string;
  subject: string;
  tags?: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LessonPlanList() {
  const router = useRouter();
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetchLessonPlans();
  }, [subject]);

  const fetchLessonPlans = async () => {
    try {
      const url = subject 
        ? `/api/lesson-plans?subject=${encodeURIComponent(subject)}`
        : '/api/lesson-plans';
        
      const res = await fetch(url);
      if (!res.ok) throw new Error('获取失败');
      
      const data = await res.json();
      setLessonPlans(data);
      setLoading(false);
    } catch (error: any) {
      toast.error('加载失败: ' + error.message);
      setLoading(false);
    }
  };

  const deleteLessonPlan = async (id: number) => {
    if (!confirm('确定要删除这个课件吗？')) return;
    
    try {
      const res = await fetch(`/api/lesson-plans/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('删除失败');
      
      toast.success('课件已删除');
      fetchLessonPlans(); // 重新加载列表
    } catch (error: any) {
      toast.error('删除失败: ' + error.message);
    }
  };

  return (
    <div>
      {/* 筛选器 */}
      <div className="mb-6">
        <label htmlFor="subject" className="block mb-2 text-sm font-medium">按学科筛选</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border rounded w-full md:w-64"
        >
          <option value="">所有学科</option>
          <option value="数学">数学</option>
          <option value="语文">语文</option>
          <option value="英语">英语</option>
          <option value="计算机">计算机</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>加载中...</p>
        </div>
      ) : lessonPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessonPlans.map((plan) => (
            <Card key={plan.id} className="p-4 flex flex-col">
              <h3 className="font-bold text-lg">{plan.title}</h3>
              <p className="text-sm text-gray-500">学科: {plan.subject}</p>
              {plan.tags && (
                <p className="text-sm text-gray-500">标签: {plan.tags}</p>
              )}
              <p className="text-sm text-gray-500">
                创建于: {new Date(plan.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                状态: {plan.isPublished ? '已发布' : '草稿'}
              </p>
              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push(`/dashboard/teacher/lesson-plans/${plan.id}`)}
                >
                  查看详情
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push(`/dashboard/teacher/lesson-plans/${plan.id}/edit`)}
                >
                  编辑
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteLessonPlan(plan.id)}
                >
                  删除
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="mb-4">暂无备课记录</p>
          <Link href="/dashboard/teacher/lesson-plans/new">
            <Button>创建新备课</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 