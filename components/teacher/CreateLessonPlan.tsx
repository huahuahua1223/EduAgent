"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function CreateLessonPlan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: JSON.stringify({
      sections: [
        { type: "heading", content: "课程标题" },
        { type: "paragraph", content: "请输入课程内容..." }
      ]
    }),
    tags: "",
    isPublished: false
  });

  // 解析内容以便在编辑器中展示
  const parsedContent = JSON.parse(formData.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/lesson-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error('创建失败');
      }
      
      toast.success('课件创建成功');
      router.push('/dashboard/teacher/lesson-plans');
      router.refresh();
    } catch (error) {
      toast.error('创建失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // AI内容生成功能
  const generateAIContent = async () => {
    if (!formData.subject) {
      toast.error('请先选择学科');
      return;
    }
    
    setGenerating(true);
    toast.info('AI正在生成备课内容...');
    
    try {
      const res = await fetch('/api/ai/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subject: formData.subject,
          title: formData.title,
          keywords: formData.tags
        })
      });
      
      if (!res.ok) throw new Error('AI生成失败');
      
      const aiContent = await res.json();
      
      setFormData(prev => ({
        ...prev,
        content: JSON.stringify(aiContent)
      }));
      
      toast.success('AI内容生成完成!');
    } catch (error) {
      toast.error('生成失败: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">课件标题</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="subject">学科</Label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">选择学科</option>
            <option value="数学">数学</option>
            <option value="语文">语文</option>
            <option value="英语">英语</option>
            <option value="计算机">计算机</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="tags">标签（用逗号分隔）</Label>
          <Input
            id="tags"
            placeholder="例如: 初中,函数,解方程"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Label>课件内容</Label>
          <Button 
            type="button" 
            onClick={generateAIContent} 
            disabled={generating || !formData.subject}
            className="ml-2"
          >
            {generating ? '生成中...' : 'AI智能生成内容'}
          </Button>
        </div>
        
        {/* 简易内容显示区域 */}
        <div className="border rounded p-4 max-h-96 overflow-y-auto">
          {parsedContent.sections?.map((section, idx) => (
            <div key={idx} className="mb-4">
              {section.type === "heading" ? (
                <h3 className="text-lg font-bold">{section.content}</h3>
              ) : (
                <p className="whitespace-pre-line">{section.content}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* 内容编辑框 - 如果需要手动编辑 */}
        <div>
          <Label htmlFor="content">手动编辑内容 (JSON格式)</Label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => {
              try {
                // 验证是否为有效JSON
                JSON.parse(e.target.value);
                setFormData({...formData, content: e.target.value});
              } catch (error) {
                // 无效JSON时不更新
              }
            }}
            className="w-full h-32 p-2 border rounded font-mono text-sm"
            placeholder="JSON格式内容"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
          />
          <Label htmlFor="isPublished">发布课件</Label>
        </div>
        
        <div className="flex space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? '保存中...' : '创建课件'}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
          >
            取消
          </Button>
        </div>
      </form>
    </Card>
  );
} 