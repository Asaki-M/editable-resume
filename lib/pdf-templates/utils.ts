/**
 * PDF 模板工具函数
 */

/**
 * 格式化日期为中文显示
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
}

/**
 * 安全处理文件名，移除特殊字符
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '_') // 空格替换为下划线
    .substring(0, 50); // 限制长度
}

/**
 * 转义 HTML 特殊字符
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 生成通用的 CSS 重置样式
 */
export function getResetCSS(): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
      line-height: 1.6;
      color: #374151;
      background: white;
    }

    .resume {
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }

    @media print {
      body { 
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .resume { 
        margin: 0; 
        padding: 15px; 
      }
    }
  `;
}

/**
 * 生成基础的 HTML 结构
 */
export function generateBaseHTML(title: string, css: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    ${getResetCSS()}
    ${css}
  </style>
</head>
<body>
  <div class="resume">
    ${content}
  </div>
</body>
</html>`;
}
