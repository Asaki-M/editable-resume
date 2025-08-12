# 简历编辑器 | Resume Editor

<div align="center">

![简历编辑器](https://img.shields.io/badge/简历编辑器-v1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**一个现代化的在线简历编辑器，支持多种模板、实时预览、PDF导出**

[在线体验](https://editable-resume.vercel.app)

</div>

## ✨ 功能特性

### 📝 核心功能

- **可视化编辑** - 直观的表单界面，支持实时编辑
- **实时预览** - 所见即所得的预览效果
- **PDF 导出** - 高质量 PDF 生成，支持下载
- **多种模板** - 内置极简、经典、创意等多种专业模板
- **模块管理** - 支持模块排序和显示/隐藏控制

### 🎨 设计特色

- **响应式设计** - 完美适配桌面端和移动端
- **暗黑模式** - 支持明暗主题切换
- **图标支持** - 丰富的图标库，提升视觉效果
- **现代化 UI** - 基于 shadcn/ui 的精美界面

### 💾 数据管理

- **数据持久化** - 自动保存编辑内容
- **版本管理** - 支持多版本简历管理
- **导入导出** - 支持数据导入导出功能

## 🛠 技术栈

### 前端框架

- **Next.js 15** - React 全栈框架，使用 App Router
- **React 19** - 最新的 React 版本
- **TypeScript** - 静态类型检查和代码提示

### 样式和 UI

- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Lucide React** - 现代化图标库
- **Radix UI** - 无样式、可访问的 UI 组件

### 表单和验证

- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript 优先的模式验证

### PDF 生成

- **Puppeteer** - 无头浏览器，用于 PDF 生成
- **Chrome DevTools Protocol** - 高质量渲染

## 🎯 核心功能详解

### 1. 📝 简历编辑

#### 个人信息模块

- **基本信息**: 姓名、邮箱、电话、地址
- **社交链接**: GitHub、LinkedIn、个人网站
- **个人简介**: 支持多行文本，自动换行
- **图标支持**: 每个字段都有对应的图标，提升视觉效果

#### 工作经历模块

- **公司信息**: 公司名称、职位、工作地点
- **时间管理**: 开始时间、结束时间、是否在职
- **工作描述**: 支持多行描述，保持格式
- **动态添加**: 支持添加多段工作经历

#### 教育背景模块

- **学校信息**: 学校名称、专业、学历
- **时间管理**: 入学时间、毕业时间、是否在读
- **多学历支持**: 可添加多个教育经历

#### 技能模块

- **分类管理**: 按技能类别分组
- **熟练程度**: 初级、中级、高级、专家
- **技能标签**: 支持多个技能标签

#### 项目经历模块

- **项目信息**: 项目名称、时间段
- **项目描述**: 详细的项目描述和技术栈
- **时间管理**: 项目开始和结束时间

#### 证书模块

- **证书信息**: 证书名称、颁发机构
- **时间管理**: 获得时间、有效期
- **多证书支持**: 可添加多个证书

#### 语言能力模块

- **语言种类**: 中文、英文、日文等
- **熟练程度**: 母语、流利、良好、一般

### 2. 🎨 模板系统

#### 极简模板 (Minimal)

- **设计理念**: 简洁清爽，突出内容
- **适用场景**: 技术岗位、学术研究
- **特色**: 黑白配色，清晰的层次结构

### 3. 📄 PDF 导出

#### 技术实现

- **Puppeteer**: 使用无头浏览器生成 PDF
- **样式保持**: 完美保持网页样式
- **高质量**: 矢量图形，清晰度高
- **跨平台**: 支持所有操作系统

#### 导出特性

- **自定义文件名**: 基于姓名自动生成
- **一键下载**: 点击即可下载
- **格式优化**: A4 纸张大小，适合打印
- **字体嵌入**: 确保字体显示一致

### 4. 🔧 模块管理

#### 排序功能

- **实时预览**: 排序后立即生效
- **保存状态**: 自动保存排序设置

#### 显示控制

- **开关控制**: 每个模块都有显示/隐藏开关
- **动态渲染**: 隐藏的模块不会在预览中显示
- **PDF 同步**: 预览和 PDF 保持一致

### 5. 💾 版本管理

#### 版本功能

- **多版本支持**: 可保存多个简历版本
- **版本命名**: 自定义版本名称
- **快速切换**: 一键切换不同版本
- **历史记录**: 查看版本创建时间

#### 数据持久化

- **本地存储**: 使用 localStorage 保存数据
- **自动保存**: 编辑时自动保存
- **数据恢复**: 刷新页面后数据不丢失

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm
- Git

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/Asaki-M/editable-resume.git
cd editable-resume
```

2. **安装依赖**

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

3. **启动开发服务器**

```bash
pnpm dev
# 或
npm run dev
```

4. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000) 开始使用

### 可用脚本

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 代码质量
pnpm lint         # 运行 ESLint
pnpm type-check   # TypeScript 类型检查

# 测试
pnpm test         # 运行测试
```
## 🔧 开发指南

### 添加新模板

1. **创建模板文件**

```typescript
// lib/pdf-templates/new-template.ts
export function generateNewTemplate(data: Resume): string {
  return `
    <html>
      <head>
        <style>
          /* 模板样式 */
        </style>
      </head>
      <body>
        <!-- 模板内容 -->
      </body>
    </html>
  `;
}
```

2. **注册模板**

```typescript
// lib/pdf-templates/index.ts
import { generateNewTemplate } from './new-template';

export const templates = {
  minimal: generateMinimalTemplate,
  classic: generateClassicTemplate,
  creative: generateCreativeTemplate,
  newTemplate: generateNewTemplate, // 添加新模板
};
```

### 添加新表单字段

1. **更新类型定义**

```typescript
// lib/types/resume.ts
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary?: string;
  newField?: string; // 添加新字段
}
```

2. **更新表单组件**

```tsx
// components/resume/forms/PersonalInfoForm.tsx
<div className="space-y-3">
  <Label htmlFor="newField" className="flex items-center gap-2 font-medium text-slate-700">
    <Icon className="h-4 w-4 text-slate-600" />
    新字段
  </Label>
  <Input id="newField" {...register('personalInfo.newField')} placeholder="请输入新字段" />
</div>
```

3. **更新预览组件**

```tsx
// components/resume/ResumePreview.tsx
{
  personalInfo.newField && (
    <div className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {personalInfo.newField}
    </div>
  );
}
```

### 自定义样式

1. **修改主题颜色**

```css
/* app/globals.css */
:root {
  --primary: 220 14.3% 95.9%;
  --primary-foreground: 220.9 39.3% 11%;
  /* 自定义颜色变量 */
}
```

2. **添加自定义组件样式**

```css
/* 自定义简历样式 */
.resume-section {
  @apply mb-8 border-b border-gray-200 pb-6 last:border-b-0;
}

.resume-title {
  @apply mb-4 text-lg font-semibold text-gray-900;
}
```

### API 扩展

1. **添加新的 API 路由**

```typescript
// app/api/templates/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const templates = [
    { id: 'minimal', name: '极简模板' },
    { id: 'classic', name: '经典模板' },
    { id: 'creative', name: '创意模板' },
  ];

  return NextResponse.json(templates);
}
```

2. **扩展 PDF 导出功能**

```typescript
// app/api/export-pdf/route.ts
export async function POST(request: Request) {
  const { resumeData, template, options } = await request.json();

  // 添加自定义选项处理
  const pdfOptions = {
    format: 'A4',
    printBackground: true,
    margin: options?.margin || { top: '1cm', bottom: '1cm' },
  };

  // 生成 PDF
}
```

## 🤝 贡献指南

### 提交规范

使用 Conventional Commits 格式：

```bash
feat: 添加新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 分支策略

- `main`: 生产分支
- `develop`: 开发分支
- `feature/*`: 功能分支
- `hotfix/*`: 热修复分支

### Pull Request 流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 开源协议

本项目基于 [MIT 协议](LICENSE) 开源。

## 🙏 致谢

感谢以下开源项目的支持：

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Puppeteer](https://pptr.dev/) - PDF 生成
- [Lucide](https://lucide.dev/) - 图标库
- [React Hook Form](https://react-hook-form.com/) - 表单处理
- [Zod](https://zod.dev/) - 模式验证

## 📞 支持

如果这个项目对你有帮助，请给它一个 ⭐！

有问题或建议？欢迎：

- 提交 [Issue](https://github.com/Asaki-M/editable-resume/issues)
- 发起 [Discussion](https://github.com/Asaki-M/editable-resume/discussions)
- 贡献代码 [Pull Request](https://github.com/Asaki-M/editable-resume/pulls)

---

## TODO：

- [] 加入AI润色功能
- [] 增加简历预设模版

<div align="center">

**简历编辑器** - 让简历制作变得简单高效 ✨

Made with ❤️ by [Asaki-M](https://github.com/Asaki-M)

</div>

