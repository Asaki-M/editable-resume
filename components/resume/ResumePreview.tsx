'use client';

import { Resume } from '~/lib/types/resume';
import { Badge } from '~/components/ui/badge';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, GraduationCap, Award, Code, Briefcase, Languages, FolderOpen } from 'lucide-react';

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
  const renderWorkExperience = () => (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
        <Briefcase className="h-4 w-4 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">工作经历</h2>
      </div>
      {workExperience.length > 0 ? (
        <div className="space-y-4">
          {workExperience.map((work, index) => (
            <div key={work.id || index} className="border-l-2 border-gray-300 pl-4">
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{work.position}</h3>
                  <p className="text-sm font-medium text-gray-600">{work.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    📅 {formatDate(work.startDate)} - {work.current ? '至今' : formatDate(work.endDate || '')}
                  </p>
                  <p className="text-xs text-gray-500">📍 {work.location}</p>
                </div>
              </div>
              <div className="mb-2 text-sm break-words whitespace-pre-wrap text-gray-700">{work.description}</div>
              {work.achievements && work.achievements.length > 0 && (
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-700">主要成就：</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {work.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p>暂无工作经历</p>
        </div>
      )}
    </div>
  );

  // 根据模块顺序渲染模块
  const renderModule = (moduleId: string) => {
    switch (moduleId) {
      case 'workExperience':
        return renderWorkExperience();
      case 'education':
        return (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
              <GraduationCap className="h-4 w-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">教育背景</h2>
            </div>
            {education.length > 0 ? (
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="border-l-2 border-gray-300 pl-4">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-sm font-medium text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-600">{edu.major}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          📅 {formatDate(edu.startDate)} - {edu.current ? '至今' : formatDate(edu.endDate || '')}
                        </p>
                      </div>
                    </div>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>暂无教育背景</p>
              </div>
            )}
          </div>
        );
      case 'skills':
        return (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
              <Code className="h-4 w-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">技能</h2>
            </div>
            {skills.length > 0 ? (
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.id || index} className="border-l-2 border-gray-300 pl-4">
                    <h3 className="mb-2 text-base font-semibold text-gray-800">{skill.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.skills.map((s, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-gray-100 text-xs text-gray-700">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>暂无技能信息</p>
              </div>
            )}
          </div>
        );
      case 'projects':
        return (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
              <FolderOpen className="h-4 w-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">项目经历</h2>
            </div>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index} className="border-l-2 border-gray-300 pl-4">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
                            🔗 {project.url}
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          📅 {formatDate(project.startDate)} - {project.current ? '进行中' : formatDate(project.endDate || '')}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2 text-sm break-words whitespace-pre-wrap text-gray-700">{project.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-gray-300 text-xs text-gray-600">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">
                <p>暂无项目经历</p>
              </div>
            )}
          </div>
        );
      case 'certifications':
        return (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
              <Award className="h-4 w-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">证书</h2>
            </div>
            {certifications.length > 0 ? (
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={cert.id || index} className="border-l-2 border-gray-300 pl-4">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{cert.name}</h3>
                        <p className="text-sm font-medium text-gray-600">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">📅 {formatDate(cert.date)}</p>
                        {cert.expiryDate && <p className="text-xs text-gray-500">⏰ 到期: {formatDate(cert.expiryDate)}</p>}
                      </div>
                    </div>
                    {cert.credentialId && <p className="text-xs text-gray-600">证书编号: {cert.credentialId}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">
                <p>暂无证书信息</p>
              </div>
            )}
          </div>
        );
      case 'languages':
        return (
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
              <Languages className="h-4 w-4 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">语言能力</h2>
            </div>
            {languages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang, index) => (
                  <div key={lang.id || index} className="border-l-2 border-gray-300 pl-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-800">{lang.language}</span>
                      <Badge variant="secondary" className="bg-gray-100 text-xs text-gray-700">
                        {lang.proficiency}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">
                <p>暂无语言信息</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 bg-white p-8 shadow-sm ${className}`} id="resume-preview">
      {/* 内容容器 */}
      <div>
        {/* 个人信息头部 */}
        <div className="mb-6 border-b border-gray-300 pb-6">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">{personalInfo.fullName || '姓名'}</h1>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.email}</span>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.website}</span>
                </div>
              )}

              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.github}</span>
                </div>
              )}

              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3 w-3 text-gray-500" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
            <h2 className="text-lg font-semibold text-gray-800">个人简介</h2>
          </div>
          <div className="text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-700">{personalInfo.summary}</div>
        </div>
      )}

      {/* 动态渲染模块 */}
      {moduleOrder
        ?.filter((module) => module.enabled)
        .map((module) => (
          <div key={module.id}>{renderModule(module.id)}</div>
        ))}
    </div>
  );
}
