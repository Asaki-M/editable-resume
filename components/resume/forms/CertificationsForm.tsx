'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Resume, createNewCertification } from '~/lib/types/resume';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  form: UseFormReturn<Resume>;
}

export function CertificationsForm({ form }: CertificationsFormProps) {
  const { register, control, formState: { errors } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  const addCertification = () => {
    append(createNewCertification());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">证书</h3>
        <Button
          type="button"
          onClick={addCertification}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加证书
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">
              暂无证书信息，点击上方按钮添加
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
              证书 {index + 1}
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
                <Label htmlFor={`name-${index}`}>证书名称 *</Label>
                <Input
                  id={`name-${index}`}
                  {...register(`certifications.${index}.name`)}
                  placeholder="证书名称"
                />
                {errors.certifications?.[index]?.name && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`issuer-${index}`}>颁发机构 *</Label>
                <Input
                  id={`issuer-${index}`}
                  {...register(`certifications.${index}.issuer`)}
                  placeholder="颁发机构"
                />
                {errors.certifications?.[index]?.issuer && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.issuer?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`date-${index}`}>获得日期 *</Label>
                <Input
                  id={`date-${index}`}
                  type="month"
                  {...register(`certifications.${index}.date`)}
                />
                {errors.certifications?.[index]?.date && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.date?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`expiryDate-${index}`}>过期日期</Label>
                <Input
                  id={`expiryDate-${index}`}
                  type="month"
                  {...register(`certifications.${index}.expiryDate`)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`credentialId-${index}`}>证书编号</Label>
                <Input
                  id={`credentialId-${index}`}
                  {...register(`certifications.${index}.credentialId`)}
                  placeholder="证书编号"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`url-${index}`}>证书链接</Label>
                <Input
                  id={`url-${index}`}
                  type="url"
                  {...register(`certifications.${index}.url`)}
                  placeholder="https://certificate-url.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
