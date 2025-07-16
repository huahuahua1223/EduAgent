import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// 创建课件
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "TEACHER") {
      return Response.json({ error: "未授权操作" }, { status: 401 });
    }
    
    const data = await req.json();
    const lessonPlan = await prisma.lessonPlan.create({
      data: {
        ...data,
        teacherId: parseInt(session.user.id), // 将字符串ID转换为整数
      }
    });
    
    return Response.json(lessonPlan);
  } catch (error: any) {
    console.error("创建课件错误:", error);
    return Response.json({ 
      error: "创建课件失败", 
      details: error.message 
    }, { status: 500 });
  }
}

// 获取课件列表
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return Response.json({ error: "未授权" }, { status: 401 });
  }
  
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  
  const lessonPlans = await prisma.lessonPlan.findMany({
    where: {
      teacherId: parseInt(session.user.id), // 同样修改这里
      ...(subject ? { subject } : {})
    }
  });
  
  return Response.json(lessonPlans);
} 