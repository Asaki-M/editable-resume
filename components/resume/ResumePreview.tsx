'use client';

import { Resume } from '~/lib/types/resume';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Calendar } from 'lucide-react';

interface ResumePreviewProps {
  data: Resume;
  className?: string;
}

export function ResumePreview({ data, className }: ResumePreviewProps) {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  return (
    <div className={`relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 rounded-2xl shadow-2xl border border-white/20 overflow-hidden ${className}`} id="resume-preview">
      {/* 现代化装饰背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-teal-500/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      {/* 内容容器 */}
      <div className="relative z-10">
        {/* 个人信息头部 */}
        <div className="relative pb-8 mb-8">
          {/* 现代化装饰背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/6 to-teal-500/8 rounded-2xl -m-6 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-white/40 rounded-2xl -m-6 shadow-inner"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
              {personalInfo.fullName || '姓名'}
            </h1>

            <div className="grid grid-cols-2 gap-6 text-sm text-slate-600">
              <div className="space-y-3">
                {personalInfo.email && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-green-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-red-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">{personalInfo.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {personalInfo.website && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                      <Github className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">{personalInfo.github}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">{personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

          {personalInfo.summary && (
            <div className="mt-8 p-6 bg-gradient-to-r from-white/90 via-indigo-50/50 to-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <p className="text-slate-700 leading-relaxed text-base font-medium">{personalInfo.summary}</p>
            </div>
          )}
        </div>

        {/* 工作经历 */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                工作经历
              </h2>
            </div>
            <div className="space-y-8">
              {workExperience.map((work) => (
                <div key={work.id} className="relative p-8 bg-gradient-to-r from-white/90 via-blue-50/30 to-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute left-0 top-8 w-2 h-20 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg"></div>
                <div className="flex justify-between items-start mb-4 ml-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{work.position}</h3>
                    <p className="text-blue-600 font-medium text-base">{work.company}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(work.startDate)} - {work.current ? '至今' : formatDate(work.endDate || '')}
                      </span>
                    </div>
                    <p className="text-slate-500">{work.location}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed ml-4">{work.description}</p>
                {work.achievements.length > 0 && (
                  <ul className="mt-4 ml-4 space-y-1">
                    {work.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 教育背景 */}
      {education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              教育背景
            </h2>
          </div>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute left-0 top-6 w-1 h-12 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <div className="flex justify-between items-start ml-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{edu.school}</h3>
                    <p className="text-green-600 font-medium">{edu.degree} - {edu.major}</p>
                    {edu.gpa && <p className="text-sm text-slate-600 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(edu.startDate)} - {edu.current ? '至今' : formatDate(edu.endDate || '')}
                      </span>
                    </div>
                  </div>
                </div>
                {edu.honors.length > 0 && (
                  <div className="mt-3 ml-4">
                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-green-600">荣誉: </span>
                      {edu.honors.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 技能 */}
      {skills.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              技能
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillCategory) => (
              <div key={skillCategory.id} className="p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-semibold text-slate-800 text-lg">{skillCategory.category}</h3>
                  <Badge variant="outline" className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    {skillCategory.level}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, index) => (
                    <Badge key={index} className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 transition-colors border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 项目经历 */}
      {projects.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              项目经历
            </h2>
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute left-0 top-6 w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                <div className="flex justify-between items-start mb-4 ml-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                    {(project.url || project.github) && (
                      <div className="flex gap-4 text-sm mt-2">
                        {project.url && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Globe className="w-3 h-3" />
                            <span>项目链接</span>
                          </div>
                        )}
                        {project.github && (
                          <div className="flex items-center gap-1 text-slate-600">
                            <Github className="w-3 h-3" />
                            <span>GitHub</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(project.startDate)} - {project.current ? '至今' : formatDate(project.endDate || '')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 ml-4">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 ml-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200 hover:from-indigo-200 hover:to-purple-200 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.achievements.length > 0 && (
                  <ul className="ml-4 space-y-1">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 证书和语言 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 证书 */}
        {certifications.length > 0 && (
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                证书
              </h2>
            </div>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200/50">
                  <h3 className="font-semibold text-slate-800 mb-1">{cert.name}</h3>
                  <p className="text-amber-700 font-medium text-sm">{cert.issuer}</p>
                  <p className="text-slate-600 text-sm">{formatDate(cert.date)}</p>
                  {cert.url && (
                    <p className="text-blue-600 text-xs mt-1 truncate">{cert.url}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 语言能力 */}
        {languages.length > 0 && (
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                语言能力
              </h2>
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200/50">
                  <span className="font-medium text-slate-800">{lang.language}</span>
                  <Badge className="text-xs bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 border-teal-200 hover:from-teal-200 hover:to-cyan-200 transition-colors">
                    {lang.proficiency}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
