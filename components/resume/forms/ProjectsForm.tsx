'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewProject } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface ProjectsFormProps {
  form: UseFormReturn<Resume>;
}

export function ProjectsForm({ form }: ProjectsFormProps) {
  const { register, control, watch, setValue, formState: { errors } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const watchedProjects = watch('projects');
  const [newTechnologies, setNewTechnologies] = useState<string[]>([]);

  const addProject = () => {
    append(createNewProject());
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    setValue(`projects.${index}.current`, checked);
    if (checked) {
      setValue(`projects.${index}.endDate`, '');
    }
  };

  const addTechnology = (projectIndex: number, technology: string) => {
    if (!technology.trim()) return;
    
    const currentTechnologies = watchedProjects?.[projectIndex]?.technologies || [];
    setValue(`projects.${projectIndex}.technologies`, [...currentTechnologies, technology.trim()]);
    
    const newTechCopy = [...newTechnologies];
    newTechCopy[projectIndex] = '';
    setNewTechnologies(newTechCopy);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechnologies = watchedProjects?.[projectIndex]?.technologies || [];
    const updatedTechnologies = currentTechnologies.filter((_, index) => index !== techIndex);
    setValue(`projects.${projectIndex}.technologies`, updatedTechnologies);
  };

  const handleNewTechChange = (projectIndex: number, value: string) => {
    const newTechCopy = [...newTechnologies];
    newTechCopy[projectIndex] = value;
    setNewTechnologies(newTechCopy);
  };

  const handleKeyPress = (e: React.KeyboardEvent, projectIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(projectIndex, newTechnologies[projectIndex] || '');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">项目经历</h3>
        <Button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加项目
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              暂无项目经历，点击上方按钮添加
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
              项目 {index + 1}
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
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>项目名称 *</Label>
              <Input
                id={`name-${index}`}
                {...register(`projects.${index}.name`)}
                placeholder="项目名称"
              />
              {errors.projects?.[index]?.name && (
                <p className="text-sm text-red-600">
                  {errors.projects[index]?.name?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>项目描述 *</Label>
              <Textarea
                id={`description-${index}`}
                {...register(`projects.${index}.description`)}
                placeholder="描述项目的目标、功能和您的贡献..."
                rows={3}
              />
              {errors.projects?.[index]?.description && (
                <p className="text-sm text-red-600">
                  {errors.projects[index]?.description?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>开始日期 *</Label>
                <Input
                  id={`startDate-${index}`}
                  type="month"
                  {...register(`projects.${index}.startDate`)}
                />
                {errors.projects?.[index]?.startDate && (
                  <p className="text-sm text-red-600">
                    {errors.projects[index]?.startDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>结束日期</Label>
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  {...register(`projects.${index}.endDate`)}
                  disabled={watchedProjects?.[index]?.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${index}`}
                checked={watchedProjects?.[index]?.current || false}
                onCheckedChange={(checked) => 
                  handleCurrentChange(index, checked as boolean)
                }
              />
              <Label htmlFor={`current-${index}`}>正在进行</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`url-${index}`}>项目链接</Label>
                <Input
                  id={`url-${index}`}
                  type="url"
                  {...register(`projects.${index}.url`)}
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`github-${index}`}>GitHub 链接</Label>
                <Input
                  id={`github-${index}`}
                  type="url"
                  {...register(`projects.${index}.github`)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>技术栈</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入技术名称，按回车添加"
                  value={newTechnologies[index] || ''}
                  onChange={(e) => handleNewTechChange(index, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
                <Button
                  type="button"
                  onClick={() => addTechnology(index, newTechnologies[index] || '')}
                  size="sm"
                >
                  添加
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedProjects?.[index]?.technologies?.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index, techIndex)}
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
