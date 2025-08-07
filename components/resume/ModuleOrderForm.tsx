'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume } from '~/lib/types/resume';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface ModuleOrderFormProps {
  form: UseFormReturn<Resume>;
}

export function ModuleOrderForm({ form }: ModuleOrderFormProps) {
  const { control, watch, setValue } = form;

  const { fields, move } = useFieldArray({
    control,
    name: 'moduleOrder',
  });

  const watchedModules = watch('moduleOrder');

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

  const toggleModule = (index: number, enabled: boolean) => {
    setValue(`moduleOrder.${index}.enabled`, enabled);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white dark:text-white">模块顺序</h3>
        <p className="text-sm text-gray-400 dark:text-gray-400">拖拽调整模块显示顺序</p>
      </div>

      <Card className="border-gray-700 bg-gray-800 dark:border-gray-700 dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white dark:text-white">简历模块管理</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fields.map((field, index) => {
            const moduleItem = watchedModules?.[index];
            return (
              <div
                key={field.id}
                className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
                  moduleItem?.enabled
                    ? 'border-gray-600 bg-gray-700 dark:border-gray-600 dark:bg-gray-700'
                    : 'border-gray-700 bg-gray-800 opacity-60 dark:border-gray-700 dark:bg-gray-800'
                }`}>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={moduleItem?.enabled || false}
                    onCheckedChange={(checked) => toggleModule(index, checked as boolean)}
                    className="border-gray-500 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                  />
                  <span className={`font-medium ${moduleItem?.enabled ? 'text-white dark:text-white' : 'text-gray-400 dark:text-gray-400'}`}>{moduleItem?.name}</span>
                  {moduleItem?.enabled ? <Eye className="h-4 w-4 text-green-400" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
                </div>

                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="h-8 w-8 border-gray-600 bg-gray-700 p-0 text-gray-300 hover:bg-gray-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveDown(index)}
                    disabled={index === fields.length - 1}
                    className="h-8 w-8 border-gray-600 bg-gray-700 p-0 text-gray-300 hover:bg-gray-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
