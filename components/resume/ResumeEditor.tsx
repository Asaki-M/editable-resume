'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Resume, ResumeSchema, defaultResumeData } from '~/lib/types/resume';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { ResumePreview } from './ResumePreview';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Save, Download, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface ResumeEditorProps {
  initialData?: Resume;
  onSave?: (data: Resume) => void;
  onExportPDF?: (data: Resume) => void;
}

export function ResumeEditor({ 
  initialData = defaultResumeData, 
  onSave, 
  onExportPDF 
}: ResumeEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const { handleSubmit, watch, formState: { errors, isDirty } } = form;

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
      await onExportPDF?.(watchedData);
      toast.success('PDF 导出成功！');
    } catch (error) {
      console.error('PDF 导出失败:', error);
      toast.error('PDF 导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* 现代化背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/2 to-teal-500/3"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-bl from-teal-400/6 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-3 drop-shadow-sm">
                简历编辑器
              </h1>
              <p className="text-slate-600 text-lg font-medium">创建专业的简历，展现最好的自己</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={togglePreview}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-white/40 hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3 text-slate-700 font-medium"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? '隐藏预览' : '显示预览'}
              </Button>
              <Button
                onClick={handleSubmit(onSubmit as any)}
                disabled={!isDirty}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 font-medium"
              >
                <Save className="w-4 h-4" />
                保存
              </Button>
              <Button
                onClick={handleExportPDF}
                disabled={isExporting || !form.formState.isValid}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 hover:from-teal-600 hover:via-cyan-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 font-medium"
              >
                <Download className="w-4 h-4" />
                {isExporting ? '导出中...' : '导出 PDF'}
              </Button>
            </div>
        </div>

        <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-white/90 via-indigo-50/30 to-white/90 backdrop-blur-sm border-white/40 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-teal-50/80 border-b border-white/30 backdrop-blur-sm">
                  <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-bold">
                    编辑简历
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-7 bg-gradient-to-r from-indigo-100/80 via-purple-100/60 to-teal-100/80 backdrop-blur-sm p-2 rounded-2xl shadow-inner">
                      <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">个人信息</TabsTrigger>
                      <TabsTrigger value="work" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">工作经历</TabsTrigger>
                      <TabsTrigger value="education" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">教育背景</TabsTrigger>
                      <TabsTrigger value="skills" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">技能</TabsTrigger>
                      <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">项目</TabsTrigger>
                      <TabsTrigger value="certifications" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">证书</TabsTrigger>
                      <TabsTrigger value="languages" className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-medium rounded-xl transition-all duration-300">语言</TabsTrigger>
                    </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <PersonalInfoForm form={form as any} />
                </TabsContent>

                <TabsContent value="work" className="space-y-4">
                  <WorkExperienceForm form={form as any} />
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <EducationForm form={form as any} />
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <SkillsForm form={form as any} />
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <ProjectsForm form={form as any} />
                </TabsContent>

                <TabsContent value="certifications" className="space-y-4">
                  <CertificationsForm form={form as any} />
                </TabsContent>

                <TabsContent value="languages" className="space-y-4">
                  <LanguagesForm form={form as any} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

          {showPreview && (
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/50">
                  <CardTitle className="text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    简历预览
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ResumePreview data={watchedData} />
                </CardContent>
              </Card>
            </div>
          )}
      </div>

        {/* 显示表单错误 */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-xl shadow-sm backdrop-blur-sm">
            <h3 className="text-red-800 font-semibold mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              请修正以下错误：
            </h3>
            <ul className="text-red-700 space-y-2">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <span className="font-medium">{key}:</span> {error?.message || '输入有误'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
