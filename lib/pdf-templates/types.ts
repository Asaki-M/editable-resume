import { Resume } from '~/lib/types/resume';

export interface PDFTemplate {
  id: string;
  name: string;
  description: string;
  generateHTML: (data: Resume) => string;
}

export type TemplateId = 'minimal';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  preview?: string; // 预览图片路径
}

export const AVAILABLE_TEMPLATES: TemplateConfig[] = [
  {
    id: 'minimal',
    name: '极简风格',
    description: '极简设计，突出内容本身',
  },
];
