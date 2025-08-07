'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewEducation } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface EducationFormProps {
  form: UseFormReturn<Resume>;
}

export function EducationForm({ form }: EducationFormProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'education',
  });

  const watchedEducation = watch('education');

  const addEducation = () => {
    append(createNewEducation());
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    setValue(`education.${index}.current`, checked);
    if (checked) {
      setValue(`education.${index}.endDate`, '');
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">教育背景</h3>
        <Button type="button" onClick={addEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          添加教育背景
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">暂无教育背景，点击上方按钮添加</p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">教育背景 {index + 1}</CardTitle>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="h-8 w-8 border-gray-200 bg-white/80 p-0 text-gray-600 hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => moveDown(index)}
                disabled={index === fields.length - 1}
                className="h-8 w-8 border-gray-200 bg-white/80 p-0 text-gray-600 hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="h-8 w-8 border-red-200 bg-white/80 p-0 text-red-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-700">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${index}`}>学校名称 *</Label>
                <Input id={`school-${index}`} {...register(`education.${index}.school`)} placeholder="学校名称" />
                {errors.education?.[index]?.school && <p className="text-sm text-red-600">{errors.education[index]?.school?.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>学位 *</Label>
                <Input id={`degree-${index}`} {...register(`education.${index}.degree`)} placeholder="学士/硕士/博士" />
                {errors.education?.[index]?.degree && <p className="text-sm text-red-600">{errors.education[index]?.degree?.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`major-${index}`}>专业 *</Label>
                <Input id={`major-${index}`} {...register(`education.${index}.major`)} placeholder="专业名称" />
                {errors.education?.[index]?.major && <p className="text-sm text-red-600">{errors.education[index]?.major?.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`gpa-${index}`}>GPA</Label>
                <Input id={`gpa-${index}`} {...register(`education.${index}.gpa`)} placeholder="3.8/4.0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>开始日期 *</Label>
                <Input id={`startDate-${index}`} type="month" {...register(`education.${index}.startDate`)} />
                {errors.education?.[index]?.startDate && <p className="text-sm text-red-600">{errors.education[index]?.startDate?.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>结束日期</Label>
                <Input id={`endDate-${index}`} type="month" {...register(`education.${index}.endDate`)} disabled={watchedEducation?.[index]?.current} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${index}`}
                checked={watchedEducation?.[index]?.current || false}
                onCheckedChange={(checked) => handleCurrentChange(index, checked as boolean)}
              />
              <Label htmlFor={`current-${index}`}>目前在读</Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
