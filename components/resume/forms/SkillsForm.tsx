'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewSkill } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface SkillsFormProps {
  form: UseFormReturn<Resume>;
}

export function SkillsForm({ form }: SkillsFormProps) {
  const { register, control, watch, setValue, formState: { errors } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const watchedSkills = watch('skills');
  const [newSkills, setNewSkills] = useState<string[]>([]);

  const addSkillCategory = () => {
    append(createNewSkill());
  };

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    if (!skill.trim()) return;
    
    const currentSkills = watchedSkills?.[categoryIndex]?.skills || [];
    setValue(`skills.${categoryIndex}.skills`, [...currentSkills, skill.trim()]);
    
    // 清空对应的输入框
    const newSkillsCopy = [...newSkills];
    newSkillsCopy[categoryIndex] = '';
    setNewSkills(newSkillsCopy);
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = watchedSkills?.[categoryIndex]?.skills || [];
    const updatedSkills = currentSkills.filter((_, index) => index !== skillIndex);
    setValue(`skills.${categoryIndex}.skills`, updatedSkills);
  };

  const handleNewSkillChange = (categoryIndex: number, value: string) => {
    const newSkillsCopy = [...newSkills];
    newSkillsCopy[categoryIndex] = value;
    setNewSkills(newSkillsCopy);
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkillToCategory(categoryIndex, newSkills[categoryIndex] || '');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">技能</h3>
        <Button
          type="button"
          onClick={addSkillCategory}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加技能分类
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              暂无技能信息，点击上方按钮添加
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
              技能分类 {index + 1}
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              className="bg-white/80 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`category-${index}`}>技能分类 *</Label>
                <Input
                  id={`category-${index}`}
                  {...register(`skills.${index}.category`)}
                  placeholder="如：编程语言、框架、工具等"
                />
                {errors.skills?.[index]?.category && (
                  <p className="text-sm text-red-600">
                    {errors.skills[index]?.category?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`level-${index}`}>熟练程度</Label>
                <Select
                  value={watchedSkills?.[index]?.level || '中级'}
                  onValueChange={(value) => setValue(`skills.${index}.level`, value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择熟练程度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="初级">初级</SelectItem>
                    <SelectItem value="中级">中级</SelectItem>
                    <SelectItem value="高级">高级</SelectItem>
                    <SelectItem value="专家">专家</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>技能列表</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入技能名称，按回车添加"
                  value={newSkills[index] || ''}
                  onChange={(e) => handleNewSkillChange(index, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
                <Button
                  type="button"
                  onClick={() => addSkillToCategory(index, newSkills[index] || '')}
                  size="sm"
                >
                  添加
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedSkills?.[index]?.skills?.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkillFromCategory(index, skillIndex)}
                      className="ml-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full p-0.5 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
