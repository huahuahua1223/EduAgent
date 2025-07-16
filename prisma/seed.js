import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * 初始化数据库数据
 */
async function main() {
  console.log('开始初始化数据...');

  // 清理现有数据
  await prisma.practice.deleteMany();
  await prisma.question.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.session.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('已清理旧数据');

  // 创建用户
  const adminPassword = await bcrypt.hash('admin123', 12);
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const studentPassword = await bcrypt.hash('student123', 12);

  const admin = await prisma.user.create({
    data: {
      name: '管理员',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const teacher = await prisma.user.create({
    data: {
      name: '李老师',
      email: 'teacher@example.com',
      password: teacherPassword,
      role: 'TEACHER',
    },
  });

  const student = await prisma.user.create({
    data: {
      name: '王同学',
      email: 'student@example.com',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('已创建用户');

  // 创建课程
  const course1 = await prisma.course.create({
    data: {
      title: '前端开发基础',
      description: '学习HTML、CSS和JavaScript的基础知识，开始Web前端开发的旅程。',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: '数据结构与算法',
      description: '学习常见的数据结构和算法，提高编程能力和问题解决能力。',
    },
  });

  console.log('已创建课程');

  // 创建问题
  const question1 = await prisma.question.create({
    data: {
      content: 'HTML中用于创建无序列表的标签是什么？',
      type: 'SINGLE_CHOICE',
      answer: 'ul',
      courseId: course1.id,
      userId: teacher.id,
    },
  });

  const question2 = await prisma.question.create({
    data: {
      content: '以下哪些是JavaScript的基本数据类型？',
      type: 'MULTI_CHOICE',
      answer: 'string,number,boolean,null,undefined,symbol,bigint',
      courseId: course1.id,
      userId: teacher.id,
    },
  });

  const question3 = await prisma.question.create({
    data: {
      content: '实现一个冒泡排序算法',
      type: 'PROGRAMMING',
      answer: 'function bubbleSort(arr) { /* ... */ }',
      courseId: course2.id,
      userId: teacher.id,
    },
  });

  console.log('已创建问题');

  // 创建资源
  await prisma.resource.create({
    data: {
      title: 'HTML基础知识讲义',
      url: '/resources/html-basics.pdf',
      type: 'LECTURE',
      courseId: course1.id,
      userId: teacher.id,
    },
  });

  await prisma.resource.create({
    data: {
      title: '数据结构练习题',
      url: '/resources/data-structure-exercises.pdf',
      type: 'EXERCISE',
      courseId: course2.id,
      userId: teacher.id,
    },
  });

  console.log('已创建资源');

  // 创建练习记录
  await prisma.practice.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      questionId: question1.id,
      answer: 'ul',
      correct: true,
      feedback: '正确！',
    },
  });

  await prisma.practice.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      questionId: question2.id,
      answer: 'string,number,boolean,null,undefined',
      correct: false,
      feedback: '不完全正确，缺少symbol和bigint。',
    },
  });

  console.log('已创建练习记录');

  console.log('数据初始化完成！');
  console.log(`
创建的用户:
- 管理员: admin@example.com (密码: admin123)
- 教师: teacher@example.com (密码: teacher123)
- 学生: student@example.com (密码: student123)
  `);
}

main()
  .catch((e) => {
    console.error('初始化数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 