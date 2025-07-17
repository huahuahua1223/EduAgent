/**
 * 单个课件操作API端点
 * 
 * 功能：
 * - GET：获取指定ID课件的详细信息
 * - PUT：更新指定ID的课件内容
 * - DELETE：删除指定ID的课件
 * 
 * 权限：
 * - 仅限教师角色访问
 * - 仅课件创建者可操作自己的课件
 */

import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "TEACHER") {
      return Response.json({ error: "未授权" }, { status: 401 });
    }
    
    const lessonPlan = await prisma.lessonPlan.findUnique({
      where: { 
        id: parseInt(params.id)
      }
    });
    
    if (!lessonPlan) {
      return Response.json({ error: "课件不存在" }, { status: 404 });
    }
    
    // 检查是否是课件的创建者
    if (lessonPlan.teacherId !== parseInt(session.user.id)) {
      return Response.json({ error: "无权访问此课件" }, { status: 403 });
    }
    
    return Response.json(lessonPlan);
  } catch (error: any) {
    return Response.json({ error: "获取课件失败", details: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "TEACHER") {
      return Response.json({ error: "未授权" }, { status: 401 });
    }
    
    const data = await req.json();
    
    const lessonPlan = await prisma.lessonPlan.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!lessonPlan) {
      return Response.json({ error: "课件不存在" }, { status: 404 });
    }
    
    // 检查是否是课件的创建者
    if (lessonPlan.teacherId !== parseInt(session.user.id)) {
      return Response.json({ error: "无权更新此课件" }, { status: 403 });
    }
    
    const updated = await prisma.lessonPlan.update({
      where: { id: parseInt(params.id) },
      data
    });
    
    return Response.json(updated);
  } catch (error: any) {
    return Response.json({ error: "更新课件失败", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "TEACHER") {
      return Response.json({ error: "未授权" }, { status: 401 });
    }
    
    const lessonPlan = await prisma.lessonPlan.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!lessonPlan) {
      return Response.json({ error: "课件不存在" }, { status: 404 });
    }
    
    // 检查是否是课件的创建者
    if (lessonPlan.teacherId !== parseInt(session.user.id)) {
      return Response.json({ error: "无权删除此课件" }, { status: 403 });
    }
    
    await prisma.lessonPlan.delete({
      where: { id: parseInt(params.id) }
    });
    
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: "删除课件失败", details: error.message }, { status: 500 });
  }
} 