'use client';

import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Resume, ResumeSchema, defaultResumeData } from '~/lib/types/resume';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { ModuleOrderForm } from './ModuleOrderForm';
import { VersionManager } from './VersionManager';

import { ResumePreview } from './ResumePreview';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggle } from '~/components/themeToggle';

interface ResumeEditorProps {
  initialData?: Resume;
  onSave?: (data: Resume) => void;
  onExportPDF?: (data: Resume) => void;
}

export function ResumeEditor({ initialData = defaultResumeData, onSave, onExportPDF }: ResumeEditorProps) {
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema) as Resolver<Resume, unknown>,
    defaultValues: initialData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = form;

  const watchedData = watch();

  const onSubmit = (data: Resume) => {
    try {
      onSave?.(data);
      toast.success('简历保存成功！');
    } catch (error) {
      console.error('保存失败:', error);
      toast.error('保存失败，请重试');
    }
  };

  const handleExportPDF = async () => {
    if (!form.formState.isValid) {
      toast.error('请先完善简历信息');
      return;
    }

    setIsExporting(true);
    try {
      // 如果有传入的 onExportPDF 回调，使用它
      if (onExportPDF) {
        onExportPDF(watchedData);
        toast.success('PDF 导出成功！');
        return;
      }

      // 否则使用默认的导出逻辑
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData: watchedData,
          template: 'minimal',
        }),
      });

      if (!response.ok) {
        throw new Error('PDF export failed');
      }

      // 获取 PDF blob
      const blob = await response.blob();

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${watchedData.personalInfo.fullName || 'resume'}.pdf`;

      // 触发下载
      document.body.appendChild(a);
      a.click();

      // 清理
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('PDF 导出成功！');
    } catch (error) {
      console.error('PDF 导出失败:', error);
      toast.error('PDF 导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 dark:bg-gray-900">
      {/* 左侧编辑面板 */}
      <div className="sticky top-0 flex h-screen w-1/2 flex-col border-r border-gray-700 bg-gray-900 dark:border-gray-700 dark:bg-gray-900">
        {/* 顶部工具栏 */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-700 bg-gray-900 p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 dark:bg-blue-600">
              <span className="text-sm font-bold text-white">Rx</span>
            </div>
            <h1 className="text-lg font-semibold text-white dark:text-white">简历编辑器</h1>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
              size="sm"
              className="h-9 bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              <Save className="mr-1 h-3 w-3" />
              保存
            </Button>
            <Button
              onClick={handleExportPDF}
              disabled={isExporting || !form.formState.isValid}
              size="sm"
              className="h-9 bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              <Download className="mr-1 h-3 w-3" />
              {isExporting ? '导出中...' : 'PDF'}
            </Button>
          </div>
        </div>

        {/* 编辑内容区域 */}
        <div
          className="min-h-0 flex-1 overflow-y-auto p-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 #1F2937',
          }}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-9 rounded-lg bg-gray-800 p-1 dark:bg-gray-800">
              <TabsTrigger
                value="personal"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                基础
              </TabsTrigger>
              <TabsTrigger
                value="work"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                工作
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                教育
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                技能
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                项目
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                证书
              </TabsTrigger>
              <TabsTrigger
                value="languages"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                语言
              </TabsTrigger>
              <TabsTrigger
                value="moduleOrder"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                排序
              </TabsTrigger>
              <TabsTrigger
                value="versions"
                className="rounded py-2 text-xs text-gray-400 data-[state=active]:bg-gray-700 data-[state=active]:text-white dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                版本
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoForm form={form} />
            </TabsContent>

            <TabsContent value="work" className="space-y-4">
              <WorkExperienceForm form={form} />
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <EducationForm form={form} />
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <SkillsForm form={form} />
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <ProjectsForm form={form} />
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              <CertificationsForm form={form} />
            </TabsContent>

            <TabsContent value="languages" className="space-y-4">
              <LanguagesForm form={form} />
            </TabsContent>

            <TabsContent value="moduleOrder" className="space-y-4">
              <ModuleOrderForm form={form} />
            </TabsContent>

            <TabsContent value="versions" className="space-y-4">
              <VersionManager
                currentData={watchedData}
                onLoadVersion={(data) => {
                  form.reset(data);
                  toast.success('版本已加载');
                }}
                onSaveVersion={(version) => {
                  toast.success(`版本 "${version.name}" 已保存`);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 右侧预览面板 */}
      <div className="flex w-1/2 flex-col bg-white dark:bg-gray-800">
        {/* 预览头部 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">简历预览</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">实时预览</div>
        </div>

        {/* 预览内容 */}
        <div className="flex-1 overflow-y-auto bg-white p-6 dark:bg-gray-800">
          <ResumePreview data={watchedData} />
        </div>
      </div>

      {/* 表单错误提示 - 固定在左侧底部 */}
      {Object.keys(errors).length > 0 && (
        <div className="absolute right-1/2 bottom-4 left-4 mr-4 rounded-lg border border-red-700 bg-red-900/90 p-4 shadow-lg backdrop-blur-sm">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-300">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            请修正以下错误：
          </h3>
          <ul className="space-y-1 text-xs text-red-200">
            {Object.entries(errors).map(([key, error]) => (
              <li key={key} className="flex items-start gap-2">
                <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-red-400"></div>
                <span>
                  <span className="font-medium">{key}:</span> {error?.message || '输入有误'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
