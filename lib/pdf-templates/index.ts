import { Resume } from '~/lib/types/resume';
import { TemplateId, PDFTemplate, AVAILABLE_TEMPLATES } from './types';
import { generateMinimalTemplate } from './minimal';

/**
 * PDF 模板管理器
 */
export class PDFTemplateManager {
  private templates: Map<TemplateId, PDFTemplate> = new Map();

  constructor() {
    // 注册极简模板
    this.registerTemplate({
      id: 'minimal',
      name: '极简风格',
      description: '极简设计，突出内容本身',
      generateHTML: generateMinimalTemplate,
    });
  }

  /**
   * 注册新模板
   */
  registerTemplate(template: PDFTemplate): void {
    this.templates.set(template.id as TemplateId, template);
  }

  /**
   * 获取模板
   */
  getTemplate(id: TemplateId): PDFTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * 获取所有可用模板
   */
  getAvailableTemplates() {
    return AVAILABLE_TEMPLATES;
  }

  /**
   * 生成 PDF HTML
   */
  generateHTML(templateId: TemplateId, data: Resume): string {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template "${templateId}" not found`);
    }
    return template.generateHTML(data);
  }
}

// 导出单例实例
export const templateManager = new PDFTemplateManager();

// 导出便捷函数
export function generateResumeHTML(templateId: TemplateId, data: Resume): string {
  return templateManager.generateHTML(templateId, data);
}

// 导出类型和常量
export * from './types';
export * from './utils';
