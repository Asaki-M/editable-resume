'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewLanguage } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  form: UseFormReturn<Resume>;
}

export function LanguagesForm({ form }: LanguagesFormProps) {
  const { register, control, watch, setValue, formState: { errors } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  const watchedLanguages = watch('languages');

  const addLanguage = () => {
    append(createNewLanguage());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">语言能力</h3>
        <Button
          type="button"
          onClick={addLanguage}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加语言
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              暂无语言信息，点击上方按钮添加
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
              语言 {index + 1}
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
                <Label htmlFor={`language-${index}`}>语言 *</Label>
                <Input
                  id={`language-${index}`}
                  {...register(`languages.${index}.language`)}
                  placeholder="如：英语、日语、法语等"
                />
                {errors.languages?.[index]?.language && (
                  <p className="text-sm text-red-600">
                    {errors.languages[index]?.language?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`proficiency-${index}`}>熟练程度 *</Label>
                <Select
                  value={watchedLanguages?.[index]?.proficiency || '中级'}
                  onValueChange={(value) => setValue(`languages.${index}.proficiency`, value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择熟练程度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="初级">初级</SelectItem>
                    <SelectItem value="中级">中级</SelectItem>
                    <SelectItem value="高级">高级</SelectItem>
                    <SelectItem value="母语">母语</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
