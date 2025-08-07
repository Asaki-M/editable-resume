import { z } from 'zod';

// 个人信息
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(1, '姓名不能为空'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().min(1, '电话号码不能为空'),
  location: z.string().min(1, '地址不能为空'),
  website: z.string().url('请输入有效的网站地址').optional().or(z.literal('')),
  linkedin: z.string().url('请输入有效的LinkedIn地址').optional().or(z.literal('')),
  github: z.string().url('请输入有效的GitHub地址').optional().or(z.literal('')),
  summary: z.string().min(10, '个人简介至少需要10个字符'),
});

// 工作经历
export const WorkExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, '公司名称不能为空'),
  position: z.string().min(1, '职位不能为空'),
  startDate: z.string().min(1, '开始日期不能为空'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().min(1, '工作地点不能为空'),
  description: z.string().min(10, '工作描述至少需要10个字符'),
  achievements: z.array(z.string()).default([]),
});

// 教育背景
export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, '学校名称不能为空'),
  degree: z.string().min(1, '学位不能为空'),
  major: z.string().min(1, '专业不能为空'),
  startDate: z.string().min(1, '开始日期不能为空'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  honors: z.array(z.string()).default([]),
});

// 技能
export const SkillSchema = z.object({
  id: z.string(),
  category: z.string().min(1, '技能分类不能为空'),
  skills: z.array(z.string().min(1, '技能名称不能为空')),
  level: z.enum(['初级', '中级', '高级', '专家']).default('中级'),
});

// 项目经历
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '项目名称不能为空'),
  description: z.string().min(10, '项目描述至少需要10个字符'),
  technologies: z.array(z.string()),
  startDate: z.string().min(1, '开始日期不能为空'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  url: z.string().url('请输入有效的项目地址').optional().or(z.literal('')),
  github: z.string().url('请输入有效的GitHub地址').optional().or(z.literal('')),
  achievements: z.array(z.string()).default([]),
});

// 证书
export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '证书名称不能为空'),
  issuer: z.string().min(1, '颁发机构不能为空'),
  date: z.string().min(1, '获得日期不能为空'),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url('请输入有效的证书地址').optional().or(z.literal('')),
});

// 语言能力
export const LanguageSchema = z.object({
  id: z.string(),
  language: z.string().min(1, '语言名称不能为空'),
  proficiency: z.enum(['初级', '中级', '高级', '母语']),
});

// 模块顺序配置
export const ModuleOrderSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean().default(true),
});

// 简历版本配置
export const ResumeVersionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  data: z.lazy(() => ResumeSchema),
});

// 完整简历数据结构
export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  workExperience: z.array(WorkExperienceSchema).optional().default([]),
  education: z.array(EducationSchema).optional().default([]),
  skills: z.array(SkillSchema).optional().default([]),
  projects: z.array(ProjectSchema).optional().default([]),
  certifications: z.array(CertificationSchema).optional().default([]),
  languages: z.array(LanguageSchema).optional().default([]),
  moduleOrder: z.array(ModuleOrderSchema).default([
    { id: 'workExperience', name: '工作经历', enabled: true },
    { id: 'education', name: '教育背景', enabled: true },
    { id: 'skills', name: '技能', enabled: true },
    { id: 'projects', name: '项目经历', enabled: true },
    { id: 'certifications', name: '证书', enabled: true },
    { id: 'languages', name: '语言能力', enabled: true },
  ]),
});

// TypeScript 类型
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type ModuleOrder = z.infer<typeof ModuleOrderSchema>;
export type ResumeVersion = z.infer<typeof ResumeVersionSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// 生成唯一ID的工具函数
export const generateId = () => Math.random().toString(36).substr(2, 9);

// 创建新的工作经历模板
export const createNewWorkExperience = (): WorkExperience => ({
  id: generateId(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  current: false,
  location: '',
  description: '',
  achievements: [],
});

// 创建新的教育背景模板
export const createNewEducation = (): Education => ({
  id: generateId(),
  school: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  current: false,
  gpa: '',
  honors: [],
});

// 创建新的技能分类模板
export const createNewSkill = (): Skill => ({
  id: generateId(),
  category: '',
  skills: [],
  level: '中级',
});

// 创建新的项目模板
export const createNewProject = (): Project => ({
  id: generateId(),
  name: '',
  description: '',
  technologies: [],
  startDate: '',
  endDate: '',
  current: false,
  url: '',
  github: '',
  achievements: [],
});

// 创建新的证书模板
export const createNewCertification = (): Certification => ({
  id: generateId(),
  name: '',
  issuer: '',
  date: '',
  expiryDate: '',
  credentialId: '',
  url: '',
});

// 创建新的语言能力模板
export const createNewLanguage = (): Language => ({
  id: generateId(),
  language: '',
  proficiency: '中级',
});

// 创建新的简历版本
export const createNewResumeVersion = (name: string, data: Resume, description?: string): ResumeVersion => ({
  id: generateId(),
  name,
  description: description || '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  data,
});

// 默认简历数据
export const defaultResumeData: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    website: '',
    linkedin: '',
    github: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  moduleOrder: [
    { id: 'workExperience', name: '工作经历', enabled: true },
    { id: 'education', name: '教育背景', enabled: true },
    { id: 'skills', name: '技能', enabled: true },
    { id: 'projects', name: '项目经历', enabled: true },
    { id: 'certifications', name: '证书', enabled: true },
    { id: 'languages', name: '语言能力', enabled: true },
  ],
};
