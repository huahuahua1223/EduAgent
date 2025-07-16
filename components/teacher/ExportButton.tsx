"use client";

/**
 * 课件导出按钮组件
 * 
 * 功能：
 * - 提供课件内容的导出功能
 * - 支持将课件导出为JSON文件和DOCX文档
 */

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Document, 
  Packer, 
  Paragraph, 
  HeadingLevel, 
  TextRun, 
  AlignmentType,
  BorderStyle,
  TableRow,
  TableCell,
  Table,
  WidthType
} from "docx";
import { saveAs } from "file-saver";

interface ExportButtonProps {
  fileName: string;
  content: string;
}

export default function ExportButton({ fileName, content }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  // 导出为JSON文件
  const exportAsJson = () => {
    // 创建下载链接
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${fileName}.json`);
    
    // 触发下载
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // 导出为DOCX文档
  const exportAsDocx = async () => {
    try {
      setIsExporting(true);
      
      // 解析课件内容
      const parsedContent = JSON.parse(content);
      
      // 生成文档内容
      const docxContent = generateDocxContent(parsedContent);
      
      // 创建文档
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // 标题
            new Paragraph({
              children: [
                new TextRun({
                  text: fileName,
                  bold: true,
                  size: 36,
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
                before: 400,
              },
            }),
            // 添加分隔线
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
              border: {
                bottom: {
                  color: "#999999",
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
              spacing: {
                after: 400,
              },
            }),
            // 课件内容
            ...docxContent,
            // 页脚
            new Paragraph({
              children: [
                new TextRun({
                  text: `由EduAgent智能教育平台生成 - ${new Date().toLocaleDateString()}`,
                  italics: true,
                  size: 18,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: {
                before: 400,
              },
            }),
          ],
        }],
      });

      // 生成并保存文档
      const buffer = await Packer.toBuffer(doc);
      saveAs(new Blob([buffer]), `${fileName}.docx`);
    } catch (error) {
      console.error("导出DOCX失败:", error);
      alert("导出DOCX失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  // 生成DOCX内容
  const generateDocxContent = (parsedContent: any) => {
    const docxElements = [];
    
    // 处理课件各部分内容
    if (parsedContent.sections && parsedContent.sections.length > 0) {
      let currentSection = "";
      
      parsedContent.sections.forEach((section: any, index: number) => {
        if (section.type === "heading") {
          // 如果是新的章节标题，并且不是第一个标题
          if (index > 0) {
            // 添加分隔段落
            docxElements.push(
              new Paragraph({
                spacing: {
                  before: 160,
                },
              })
            );
          }
          
          currentSection = section.content;
          
          docxElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: section.content,
                  bold: true,
                  size: 28,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: 240,
                after: 120,
              },
              border: {
                bottom: {
                  color: "#CCCCCC",
                  style: BorderStyle.SINGLE,
                  size: 4,
                },
              },
            })
          );
        } else {
          // 处理普通段落，支持换行
          const paragraphLines = section.content.split("\n");
          
          paragraphLines.forEach((line: string) => {
            if (line.trim()) {
              // 检测是否为列表项
              if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                const listText = line.trim().substring(2);
                docxElements.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "• ",
                        bold: true,
                      }),
                      new TextRun({
                        text: listText,
                      }),
                    ],
                    spacing: {
                      before: 60,
                      after: 60,
                    },
                    indent: {
                      left: 360,
                    },
                  })
                );
              } else {
                docxElements.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: line,
                      }),
                    ],
                    spacing: {
                      before: 80,
                      after: 80,
                    },
                  })
                );
              }
            }
          });
        }
      });
      
      // 添加课件信息表格
      if (parsedContent.metadata) {
        docxElements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "课件信息",
                bold: true,
                size: 28,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 400,
              after: 200,
            },
          })
        );
        
        // 创建表格
        const tableRows = [];
        
        // 添加表头
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "属性",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                width: {
                  size: 30,
                  type: WidthType.PERCENTAGE,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "值",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                width: {
                  size: 70,
                  type: WidthType.PERCENTAGE,
                },
              }),
            ],
          })
        );
        
        // 添加元数据行
        for (const [key, value] of Object.entries(parsedContent.metadata)) {
          tableRows.push(
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: key,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: String(value),
                    }),
                  ],
                }),
              ],
            })
          );
        }
        
        docxElements.push(
          new Table({
            rows: tableRows,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          })
        );
      }
    } else {
      // 如果内容为空
      docxElements.push(
        new Paragraph({
          text: "课件内容为空",
        })
      );
    }
    
    return docxElements;
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        onClick={exportAsJson}
        disabled={isExporting}
      >
        导出JSON
      </Button>
      <Button 
        variant="default" 
        onClick={exportAsDocx}
        disabled={isExporting}
      >
        {isExporting ? "导出中..." : "导出Word文档"}
      </Button>
    </div>
  );
} 