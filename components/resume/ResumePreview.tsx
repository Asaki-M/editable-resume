'use client';

import { Resume } from '~/lib/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: Resume;
  className?: string;
}

export function ResumePreview({ data, className }: ResumePreviewProps) {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, moduleOrder } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  // 工作经历渲染函数
  const renderWorkExperience = () =>
    workExperience.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">工作经历</h2>
        {workExperience.map((work, index) => (
          <div key={work.id || index} className="mb-6 border-b border-gray-200 pb-5 last:border-b-0">
            <div className="mb-2">
              <h3 className="mb-1 text-lg font-semibold text-black">{work.position}</h3>
              <div className="mb-1 text-gray-600">
                {work.company}, {work.location}
              </div>
              <div className="text-sm text-gray-500 italic">
                {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate || '')}
              </div>
            </div>
            <div className="leading-relaxed break-words whitespace-pre-wrap text-gray-700">{work.description}</div>
          </div>
        ))}
      </div>
    );

  // 教育背景渲染函数
  const renderEducation = () =>
    education.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">教育背景</h2>
        {education.map((edu, index) => (
          <div key={edu.id || index} className="mb-4">
            <h3 className="mb-1 text-lg font-semibold text-black">{edu.school}</h3>
            <div className="mb-1 text-gray-600">
              {edu.degree} in {edu.major}
            </div>
            <div className="text-sm text-gray-500 italic">
              {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
            </div>
          </div>
        ))}
      </div>
    );

  // 技能渲染函数
  const renderSkills = () =>
    skills.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">技能</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map((skillCategory, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-black">
                {skillCategory.category}
                <span className="rounded bg-black px-2 py-0.5 text-xs text-white">{skillCategory.level}</span>
              </div>
              <div className="text-sm text-gray-600">{skillCategory.skills.join(' · ')}</div>
            </div>
          ))}
        </div>
      </div>
    );

  // 项目经历渲染函数
  const renderProjects = () =>
    projects.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">项目经历</h2>
        {projects.map((project, index) => (
          <div key={project.id || index} className="mb-6 border-b border-gray-200 pb-5 last:border-b-0">
            <div className="mb-2">
              <h3 className="mb-1 text-lg font-semibold text-black">{project.name}</h3>
              <div className="text-sm text-gray-500 italic">
                {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate || '')}
              </div>
            </div>
            <div className="leading-relaxed break-words whitespace-pre-wrap text-gray-700">{project.description}</div>
          </div>
        ))}
      </div>
    );

  // 证书渲染函数
  const renderCertifications = () =>
    certifications.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">证书</h2>
        {certifications.map((cert, index) => (
          <div key={cert.id || index} className="mb-4">
            <h3 className="mb-1 text-lg font-semibold text-black">{cert.name}</h3>
            <div className="mb-1 text-gray-600">{cert.issuer}</div>
            <div className="text-sm text-gray-500 italic">
              {formatDate(cert.date)}
              {cert.expiryDate && ` - 有效期至 ${formatDate(cert.expiryDate)}`}
            </div>
          </div>
        ))}
      </div>
    );

  // 语言渲染函数
  const renderLanguages = () =>
    languages.length > 0 && (
      <div className="mb-10">
        <h2 className="mb-5 border-b border-black pb-1 text-sm font-semibold tracking-wider text-black uppercase">语言</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {languages.map((lang, index) => (
            <div key={index} className="mb-2">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-black">
                {lang.language}
                <span className="rounded bg-black px-2 py-0.5 text-xs text-white">{lang.proficiency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // 根据模块ID渲染对应模块
  const renderModule = (moduleId: string) => {
    switch (moduleId) {
      case 'workExperience':
        return renderWorkExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'languages':
        return renderLanguages();
      default:
        return null;
    }
  };

  return (
    <div className={`mx-auto max-w-4xl bg-white p-8 shadow-sm ${className}`}>
      {/* 个人信息头部 */}
      <div className="mb-10 text-left">
        <h1 className="mb-3 text-3xl font-light tracking-tight text-black">{personalInfo.fullName || '姓名'}</h1>

        <div className="mb-5 flex flex-wrap gap-5 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {personalInfo.github}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              {personalInfo.linkedin}
            </div>
          )}
        </div>

        {personalInfo.summary && <div className="max-w-4xl leading-relaxed break-words whitespace-pre-wrap text-gray-700">{personalInfo.summary}</div>}
      </div>

      {/* 动态渲染模块 */}
      {moduleOrder
        ?.filter((module) => module.enabled)
        .map((module) => (
          <div key={module.id}>{renderModule(module.id)}</div>
        ))}
    </div>
  );
}
