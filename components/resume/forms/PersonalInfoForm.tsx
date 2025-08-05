'use client';

import { UseFormReturn } from 'react-hook-form';
import { Resume } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface PersonalInfoFormProps {
  form: UseFormReturn<Resume>;
}

export function PersonalInfoForm({ form }: PersonalInfoFormProps) {
  const { register, formState: { errors } } = form;

  return (
    <Card className="bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border-b border-slate-200/30">
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
          </div>
          个人信息
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-slate-700 font-medium">姓名 *</Label>
            <Input
              id="fullName"
              {...register('personalInfo.fullName')}
              placeholder="请输入您的姓名"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.fullName && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-slate-700 font-medium">邮箱 *</Label>
            <Input
              id="email"
              type="email"
              {...register('personalInfo.email')}
              placeholder="your.email@example.com"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-slate-700 font-medium">电话 *</Label>
            <Input
              id="phone"
              {...register('personalInfo.phone')}
              placeholder="+86 138 0000 0000"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.phone && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="location" className="text-slate-700 font-medium">地址 *</Label>
            <Input
              id="location"
              {...register('personalInfo.location')}
              placeholder="北京市朝阳区"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.location && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.location.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3">
            <Label htmlFor="website" className="text-slate-700 font-medium">个人网站</Label>
            <Input
              id="website"
              type="url"
              {...register('personalInfo.website')}
              placeholder="https://yourwebsite.com"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.website && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.website.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="linkedin" className="text-slate-700 font-medium">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              {...register('personalInfo.linkedin')}
              placeholder="https://linkedin.com/in/yourprofile"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.linkedin && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.linkedin.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="github" className="text-slate-700 font-medium">GitHub</Label>
            <Input
              id="github"
              type="url"
              {...register('personalInfo.github')}
              placeholder="https://github.com/yourusername"
              className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-gray-400 focus:ring-gray-400/20 hover:bg-white transition-all"
            />
            {errors.personalInfo?.github && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.personalInfo.github.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="summary" className="text-slate-700 font-medium">个人简介 *</Label>
          <Textarea
            id="summary"
            {...register('personalInfo.summary')}
            placeholder="请简要介绍您的专业背景、技能特长和职业目标..."
            rows={4}
            className="bg-white/90 backdrop-blur-sm border-slate-300/50 text-slate-800 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/20 hover:bg-white transition-all resize-none"
          />
          {errors.personalInfo?.summary && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {errors.personalInfo.summary.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
