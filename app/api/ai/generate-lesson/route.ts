export async function POST(req: Request) {
  const { subject, title, keywords } = await req.json();
  
  try {
    // 这里可以集成真实的AI服务，如OpenAI API
    // 以下是模拟AI响应
    
    let content = {
      sections: [
        { type: "heading", content: `${title || subject + "教学设计"}` },
        { type: "heading", content: "教学目标" },
      ]
    };
    
    // 根据学科生成不同的内容
    switch(subject) {
      case "数学":
        content.sections.push(
          { type: "paragraph", content: "1. 掌握数学基本概念和计算方法\n2. 培养数学思维和解题能力\n3. 应用数学知识解决实际问题" },
          { type: "heading", content: "教学重点" },
          { type: "paragraph", content: "本节课重点讲解函数、方程求解以及几何证明方法" },
          { type: "heading", content: "教学过程" },
          { type: "paragraph", content: "第一部分：概念讲解(15分钟)\n第二部分：例题分析(20分钟)\n第三部分：练习巩固(10分钟)" }
        );
        break;
        
      case "语文":
        content.sections.push(
          { type: "paragraph", content: "1. 培养学生的阅读理解能力\n2. 提高文学鉴赏水平\n3. 锻炼写作表达能力" },
          { type: "heading", content: "教学重点" },
          { type: "paragraph", content: "本节课重点分析文章的主题思想、写作特色及语言风格" },
          { type: "heading", content: "教学过程" },
          { type: "paragraph", content: "第一部分：作品背景介绍(10分钟)\n第二部分：文本细读分析(25分钟)\n第三部分：写作练习(10分钟)" }
        );
        break;
        
      case "英语":
        content.sections.push(
          { type: "paragraph", content: "1. 掌握关键词汇和语法结构\n2. 提高听说读写综合能力\n3. 了解英语文化背景知识" },
          { type: "heading", content: "教学重点" },
          { type: "paragraph", content: "本节课重点讲解时态用法及日常交流表达" },
          { type: "heading", content: "教学过程" },
          { type: "paragraph", content: "第一部分：词汇教学(10分钟)\n第二部分：语法讲解(15分钟)\n第三部分：对话练习(15分钟)\n第四部分：阅读理解(10分钟)" }
        );
        break;
        
      case "计算机":
        content.sections.push(
          { type: "paragraph", content: "1. 理解编程基本原理\n2. 掌握算法设计方法\n3. 培养问题解决能力" },
          { type: "heading", content: "教学重点" },
          { type: "paragraph", content: "本节课重点讲解数据结构、算法复杂度及实际应用案例" },
          { type: "heading", content: "教学过程" },
          { type: "paragraph", content: "第一部分：理论讲解(15分钟)\n第二部分：代码示例(20分钟)\n第三部分：编程实践(15分钟)" }
        );
        break;
        
      default:
        content.sections.push(
          { type: "paragraph", content: "1. 掌握基本概念和方法\n2. 培养学科思维能力\n3. 应用所学解决实际问题" },
          { type: "heading", content: "教学重点" },
          { type: "paragraph", content: "本节课的教学重点是基础知识和核心技能的掌握" },
          { type: "heading", content: "教学过程" },
          { type: "paragraph", content: "第一部分：知识讲解(20分钟)\n第二部分：示例演示(15分钟)\n第三部分：实践活动(15分钟)" }
        );
    }
    
    // 如果有关键词，添加相关内容
    if (keywords && keywords.length > 0) {
      content.sections.push(
        { type: "heading", content: "关键知识点" },
        { type: "paragraph", content: `本节课涉及的关键知识点包括：${keywords}` }
      );
    }
    
    content.sections.push(
      { type: "heading", content: "课后作业" },
      { type: "paragraph", content: "1. 完成课本习题\n2. 预习下一章节内容\n3. 完成一个实践项目" }
    );
    
    return Response.json(content);
  } catch (error) {
    return Response.json({ error: "AI内容生成失败" }, { status: 500 });
  }
} 