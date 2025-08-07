'use client';

import { Resume } from '~/lib/types/resume';
import { Badge } from '~/components/ui/badge';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, GraduationCap, Award, Code, Briefcase, Languages, Star } from 'lucide-react';

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
    <div className="mb-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
        <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
          工作经历
        </h2>
      </div>
      {workExperience.length > 0 ? (
        <div className="space-y-6">
          {workExperience.map((work, index) => (
            <div
              key={work.id || index}
              className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-blue-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{work.position}</h3>
                  <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{work.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-500">
                    {formatDate(work.startDate)} - {work.current ? '至今' : formatDate(work.endDate || '')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-600">{work.location}</p>
                </div>
              </div>
              <div className="mb-4 whitespace-pre-wrap text-slate-700 dark:text-slate-400">{work.description}</div>
              {work.achievements && work.achievements.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-300">主要成就：</h4>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-400">
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
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                教育背景
              </h2>
            </div>
            {education.length > 0 ? (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.id || index}
                    className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-green-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{edu.degree}</h3>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">{edu.school}</p>
                        <p className="text-base text-slate-600 dark:text-slate-500">{edu.major}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-500">
                          {formatDate(edu.startDate)} - {edu.current ? '至今' : formatDate(edu.endDate || '')}
                        </p>
                      </div>
                    </div>
                    {edu.gpa && <p className="text-slate-700 dark:text-slate-400">GPA: {edu.gpa}</p>}
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
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                技能
              </h2>
            </div>
            {skills.length > 0 ? (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.id || index}
                    className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-purple-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
                    <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.skills.map((s, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
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
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                项目经历
              </h2>
            </div>
            {projects.length > 0 ? (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-orange-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{project.name}</h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">
                            {project.url}
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-500">
                          {formatDate(project.startDate)} - {project.current ? '进行中' : formatDate(project.endDate || '')}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 whitespace-pre-wrap text-slate-700 dark:text-slate-400">{project.description}</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>暂无项目经历</p>
              </div>
            )}
          </div>
        );
      case 'certifications':
        return (
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                证书
              </h2>
            </div>
            {certifications.length > 0 ? (
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id || index}
                    className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-cyan-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{cert.name}</h3>
                        <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-500">{formatDate(cert.date)}</p>
                        {cert.expiryDate && <p className="text-sm text-slate-500 dark:text-slate-600">到期: {formatDate(cert.expiryDate)}</p>}
                      </div>
                    </div>
                    {cert.credentialId && <p className="text-sm text-slate-600 dark:text-slate-500">证书编号: {cert.credentialId}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>暂无证书信息</p>
              </div>
            )}
          </div>
        );
      case 'languages':
        return (
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-lg">
                <Languages className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                语言能力
              </h2>
            </div>
            {languages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {languages.map((lang, index) => (
                  <div
                    key={lang.id || index}
                    className="relative rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-rose-50/30 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{lang.language}</span>
                      <Badge variant="secondary" className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                        {lang.proficiency}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
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
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 shadow-2xl dark:border-gray-900/40 dark:from-black dark:via-gray-950 dark:to-black ${className}`}
      id="resume-preview">
      {/* 现代化装饰背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-teal-500/5 dark:from-blue-500/1 dark:via-purple-500/0.5 dark:to-teal-500/1"></div>
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-400/10 to-transparent blur-3xl dark:from-blue-400/2 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/10 to-transparent blur-3xl dark:from-purple-400/2 dark:to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-black/5"></div>

      {/* 内容容器 */}
      <div className="relative z-10">
        {/* 个人信息头部 */}
        <div className="relative mb-8 pb-8">
          {/* 现代化装饰背景 */}
          <div className="absolute inset-0 -m-6 rounded-2xl bg-gradient-to-r from-blue-500/8 via-purple-500/6 to-teal-500/8 backdrop-blur-sm dark:from-blue-500/2 dark:via-purple-500/1 dark:to-teal-500/2"></div>
          <div className="absolute inset-0 -m-6 rounded-2xl bg-white/40 shadow-inner dark:bg-black/80"></div>
          <div className="relative z-10">
            <h1 className="mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
              {personalInfo.fullName || '姓名'}
            </h1>

            <div className="grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-500">
              <div className="space-y-3">
                {personalInfo.email && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-blue-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-400">{personalInfo.email}</span>
                  </div>
                )}

                {personalInfo.phone && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-green-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-400">{personalInfo.phone}</span>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-purple-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-400">{personalInfo.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {personalInfo.website && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-orange-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      {personalInfo.website}
                    </span>
                  </div>
                )}

                {personalInfo.github && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-gray-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-gray-700 to-gray-800">
                      <Github className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">{personalInfo.github}</span>
                  </div>
                )}

                {personalInfo.linkedin && (
                  <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-gradient-to-r from-white/80 to-blue-50/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/30 dark:from-black/90 dark:to-black/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700">
                      <Linkedin className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-700 transition-colors hover:text-indigo-600">{personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-8 rounded-2xl border border-white/40 bg-gradient-to-r from-white/90 via-indigo-50/50 to-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800/40 dark:from-black/95 dark:via-black/95 dark:to-black/95">
            <div className="text-base leading-relaxed font-medium break-words whitespace-pre-wrap text-slate-700 dark:text-slate-400">{personalInfo.summary}</div>
          </div>
        )}

        {/* 动态渲染模块 */}
        {moduleOrder
          ?.filter((module) => module.enabled)
          .map((module) => (
            <div key={module.id}>{renderModule(module.id)}</div>
          ))}
      </div>
    </div>
  );
}
