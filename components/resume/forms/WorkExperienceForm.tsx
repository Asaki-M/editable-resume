'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewWorkExperience } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface WorkExperienceFormProps {
  form: UseFormReturn<Resume>;
}

export function WorkExperienceForm({ form }: WorkExperienceFormProps) {
  const { register, control, watch, setValue, formState: { errors } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const watchedExperiences = watch('workExperience');

  const addWorkExperience = () => {
    append(createNewWorkExperience());
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    setValue(`workExperience.${index}.current`, checked);
    if (checked) {
      setValue(`workExperience.${index}.endDate`, '');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">工作经历</h3>
        <Button
          type="button"
          onClick={addWorkExperience}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加工作经历
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              暂无工作经历，点击上方按钮添加
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
              工作经历 {index + 1}
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
                <Label htmlFor={`company-${index}`}>公司名称 *</Label>
                <Input
                  id={`company-${index}`}
                  {...register(`workExperience.${index}.company`)}
                  placeholder="公司名称"
                />
                {errors.workExperience?.[index]?.company && (
                  <p className="text-sm text-red-600">
                    {errors.workExperience[index]?.company?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>职位 *</Label>
                <Input
                  id={`position-${index}`}
                  {...register(`workExperience.${index}.position`)}
                  placeholder="职位名称"
                />
                {errors.workExperience?.[index]?.position && (
                  <p className="text-sm text-red-600">
                    {errors.workExperience[index]?.position?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>开始日期 *</Label>
                <Input
                  id={`startDate-${index}`}
                  type="month"
                  {...register(`workExperience.${index}.startDate`)}
                />
                {errors.workExperience?.[index]?.startDate && (
                  <p className="text-sm text-red-600">
                    {errors.workExperience[index]?.startDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>结束日期</Label>
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  {...register(`workExperience.${index}.endDate`)}
                  disabled={watchedExperiences?.[index]?.current}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>工作地点 *</Label>
                <Input
                  id={`location-${index}`}
                  {...register(`workExperience.${index}.location`)}
                  placeholder="城市"
                />
                {errors.workExperience?.[index]?.location && (
                  <p className="text-sm text-red-600">
                    {errors.workExperience[index]?.location?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${index}`}
                checked={watchedExperiences?.[index]?.current || false}
                onCheckedChange={(checked) => 
                  handleCurrentChange(index, checked as boolean)
                }
              />
              <Label htmlFor={`current-${index}`}>目前在职</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>工作描述 *</Label>
              <Textarea
                id={`description-${index}`}
                {...register(`workExperience.${index}.description`)}
                placeholder="描述您的主要工作职责和成就..."
                rows={3}
              />
              {errors.workExperience?.[index]?.description && (
                <p className="text-sm text-red-600">
                  {errors.workExperience[index]?.description?.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
