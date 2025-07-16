# EduAgent - 智能教育平台

EduAgent是一个面向教师和学生的教育资源管理与学习平台，使用现代化的Web技术构建。平台旨在提供一站式教育解决方案，让教与学变得更简单、更高效、更有趣。

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **UI组件**: shadcn UI
- **认证**: NextAuth.js
- **数据库**: MySQL
- **ORM**: Prisma
- **包管理器**: pnpm

## 功能

### 用户系统
- 多角色系统（学生、教师、管理员）
- 用户认证（登录、注册）
- 个人资料管理
- 基于角色的权限控制

### 课程管理
- 课程创建与编辑
- 课程资源上传与管理
- 课程列表与详情展示
- 课程搜索与筛选

### 学习系统
- 多类型练习题（单选、多选、编程题）
- 练习进度跟踪
- 即时反馈与评分
- 学习数据分析

### 角色特定功能
- **学生**: 课程浏览、练习题解答、学习进度跟踪
- **教师**: 课程创建、资源上传、习题管理、学生进度查看
- **管理员**: 用户管理、系统设置、数据统计

## 本地开发

### 前置要求

- Node.js 18+ 
- pnpm
- MySQL数据库

### 安装依赖

```bash
pnpm install
```

### 环境配置

创建`.env`文件并配置以下环境变量：

```
DATABASE_URL="mysql://用户名:密码@localhost:3306/eduagent"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="你的安全密钥"
```

请将"用户名"、"密码"和"你的安全密钥"替换为你的实际配置。

### 数据库初始化与迁移

1. 确保MySQL服务已启动，并创建名为`eduagent`的数据库：

```sql
CREATE DATABASE IF NOT EXISTS eduagent;
```

2. 执行Prisma迁移以创建表结构：

```bash
pnpm db:migrate
```

3. 加载初始测试数据（可选）：

```bash
pnpm db:seed
```

这将创建测试用户、课程、问题和资源等数据。默认用户包括：
- 管理员: admin@example.com (密码: admin123)
- 教师: teacher@example.com (密码: teacher123)
- 学生: student@example.com (密码: student123)

4. 如果需要查看数据库结构，可以启动Prisma Studio：

```bash
pnpm db:studio
```

### 启动开发服务器

```bash
pnpm dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

## shadcn UI组件

本项目使用了[shadcn UI](https://ui.shadcn.com)作为UI组件库。shadcn UI是一套基于Radix UI和Tailwind CSS的高质量可定制组件。

### 已集成的组件

- Button
- Input
- Card
- Form
- Select
- Sonner
- Label

### 添加更多组件

如需添加更多组件，请使用以下命令：

```bash
npx shadcn@latest add 组件名称
```

例如，添加表格组件：

```bash
npx shadcn@latest add table
```

## 项目结构

```
eduagent/
├── app/                  # Next.js App Router
│   ├── api/              # API路由
│   │   ├── auth/         # 认证API
│   │   └── register/     # 注册API
│   ├── dashboard/        # 仪表盘页面
│   ├── login/            # 登录页面
│   ├── register/         # 注册页面
│   └── unauthorized/     # 无权限页面
├── components/           # React组件
│   ├── auth/             # 认证相关组件
│   ├── layout/           # 布局组件
│   ├── providers/        # 上下文提供者
│   └── ui/               # UI组件 (shadcn)
├── lib/                  # 工具函数和服务
│   ├── auth.ts           # 认证相关功能
│   ├── users.ts          # 用户管理功能
│   └── utils.ts          # 通用工具函数
├── prisma/               # Prisma配置和迁移
│   ├── schema.prisma     # 数据库模型定义
│   ├── seed.js           # 种子数据脚本
│   └── migrations/       # 数据库迁移记录
└── types/                # TypeScript类型定义
```

## 数据库模型

项目使用Prisma ORM管理以下数据模型：

### User (用户)
- `id`: 用户ID，自增主键
- `email`: 用户邮箱，唯一
- `name`: 用户名称
- `role`: 用户角色 (STUDENT/TEACHER/ADMIN)
- `password`: 加密密码
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Session (会话)
- `id`: 会话ID，自增主键
- `sessionToken`: 会话令牌，唯一
- `userId`: 用户ID，外键关联User表
- `expires`: 过期时间

### Course (课程)
- `id`: 课程ID，自增主键
- `title`: 课程标题
- `description`: 课程描述
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Question (问题)
- `id`: 问题ID，自增主键
- `courseId`: 课程ID，外键关联Course表
- `userId`: 创建者ID，外键关联User表
- `content`: 问题内容
- `type`: 问题类型 (SINGLE_CHOICE/MULTI_CHOICE/PROGRAMMING)
- `answer`: 答案
- `createdAt`: 创建时间

### Practice (练习)
- `id`: 练习记录ID，自增主键
- `userId`: 用户ID，外键关联User表
- `courseId`: 课程ID，外键关联Course表
- `questionId`: 问题ID，外键关联Question表
- `answer`: 用户答案
- `correct`: 是否正确
- `feedback`: 反馈信息
- `createdAt`: 创建时间

### Resource (资源)
- `id`: 资源ID，自增主键
- `courseId`: 课程ID，外键关联Course表
- `userId`: 上传者ID，外键关联User表
- `title`: 资源标题
- `url`: 资源链接
- `type`: 资源类型 (LECTURE/EXERCISE/OTHER)
- `uploadedAt`: 上传时间

## 下一步计划

- 实现课程搜索功能
- 添加用户头像上传
- 完善教师评分系统
- 增加实时通知功能
- 开发移动端响应式界面

## 许可证

本项目采用MIT许可证
