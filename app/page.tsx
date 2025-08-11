'use client';

import { useState, useCallback } from 'react';
import { ResumeEditor } from '~/components/resume/ResumeEditor';
import { Resume, defaultResumeData } from '~/lib/types/resume';
import { toast } from 'sonner';

export default function Home() {
  const [resumeData, setResumeData] = useState<Resume>(defaultResumeData);

  const handleSave = useCallback((data: Resume) => {
    // 保存到本地存储
    localStorage.setItem('resumeData', JSON.stringify(data));
    setResumeData(data);
    console.log('Resume saved:', data);
  }, []);

  const handleExportPDF = useCallback(async (data: Resume) => {
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData: data, template: 'minimal' }),
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
      a.download = `${data.personalInfo.fullName || 'resume'}.pdf`;

      // 触发下载
      document.body.appendChild(a);
      a.click();

      // 清理
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  }, []);

  // 从本地存储加载数据
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setResumeData(parsedData);
        } catch (error) {
          console.error('Failed to parse saved resume data:', error);
          toast.error('加载保存的简历数据失败');
        }
      }
    }
  });

  return <ResumeEditor initialData={resumeData} onSave={handleSave} onExportPDF={handleExportPDF} />;
}
