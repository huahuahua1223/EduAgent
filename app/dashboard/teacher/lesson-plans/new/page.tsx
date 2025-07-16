import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import CreateLessonPlan from "@/components/teacher/CreateLessonPlan";

export default async function NewLessonPlanPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "TEACHER") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">创建新备课</h1>
      <CreateLessonPlan />
    </div>
  );
} 