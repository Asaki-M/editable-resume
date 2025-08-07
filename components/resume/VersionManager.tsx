'use client';

import { useState } from 'react';
import { Resume, ResumeVersion, createNewResumeVersion } from '~/lib/types/resume';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Badge } from '~/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Save, History, Plus, Trash2, Eye, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface VersionManagerProps {
  currentData: Resume;
  onLoadVersion: (data: Resume) => void;
  onSaveVersion: (version: ResumeVersion) => void;
}

export function VersionManager({ currentData, onLoadVersion, onSaveVersion }: VersionManagerProps) {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');

  // 从localStorage加载版本
  const loadVersionsFromStorage = () => {
    try {
      const stored = localStorage.getItem('resume-versions');
      if (stored) {
        const parsedVersions = JSON.parse(stored) as ResumeVersion[];
        setVersions(parsedVersions);
      }
    } catch (error) {
      console.error('Failed to load versions:', error);
      toast.error('加载版本失败');
    }
  };

  // 保存版本到localStorage
  const saveVersionsToStorage = (newVersions: ResumeVersion[]) => {
    try {
      localStorage.setItem('resume-versions', JSON.stringify(newVersions));
      setVersions(newVersions);
    } catch (error) {
      console.error('Failed to save versions:', error);
      toast.error('保存版本失败');
    }
  };

  // 创建新版本
  const handleCreateVersion = () => {
    if (!newVersionName.trim()) {
      toast.error('请输入版本名称');
      return;
    }

    const newVersion = createNewResumeVersion(newVersionName.trim(), currentData, newVersionDescription.trim());

    const updatedVersions = [newVersion, ...versions];
    saveVersionsToStorage(updatedVersions);
    onSaveVersion(newVersion);

    setNewVersionName('');
    setNewVersionDescription('');
    setIsCreateDialogOpen(false);
    toast.success(`版本 "${newVersion.name}" 已保存`);
  };

  // 加载版本
  const handleLoadVersion = (version: ResumeVersion) => {
    onLoadVersion(version.data);
    toast.success(`已切换到版本 "${version.name}"`);
  };

  // 删除版本
  const handleDeleteVersion = (versionId: string) => {
    const updatedVersions = versions.filter((v) => v.id !== versionId);
    saveVersionsToStorage(updatedVersions);
    toast.success('版本已删除');
  };

  // 复制版本
  const handleDuplicateVersion = (version: ResumeVersion) => {
    const duplicatedVersion = createNewResumeVersion(`${version.name} (副本)`, version.data, version.description);

    const updatedVersions = [duplicatedVersion, ...versions];
    saveVersionsToStorage(updatedVersions);
    toast.success(`版本 "${duplicatedVersion.name}" 已创建`);
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 初始化时加载版本
  useState(() => {
    loadVersionsFromStorage();
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white dark:text-white">版本管理</h3>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              保存版本
            </Button>
          </DialogTrigger>
          <DialogContent className="border-gray-700 bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">保存新版本</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="version-name" className="text-white">
                  版本名称
                </Label>
                <Input
                  id="version-name"
                  value={newVersionName}
                  onChange={(e) => setNewVersionName(e.target.value)}
                  placeholder="例如：求职版本、实习版本"
                  className="border-gray-600 bg-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="version-description" className="text-white">
                  版本描述（可选）
                </Label>
                <Textarea
                  id="version-description"
                  value={newVersionDescription}
                  onChange={(e) => setNewVersionDescription(e.target.value)}
                  placeholder="描述这个版本的特点或用途"
                  className="border-gray-600 bg-gray-700 text-white"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  取消
                </Button>
                <Button onClick={handleCreateVersion} className="bg-blue-600 text-white hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-gray-700 bg-gray-800 dark:border-gray-700 dark:bg-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-white dark:text-white">
            <History className="h-4 w-4" />
            版本历史
          </CardTitle>
        </CardHeader>
        <CardContent>
          {versions.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              <History className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>还没有保存的版本</p>
              <p className="text-sm">点击&quot;保存版本&quot;来创建第一个版本</p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div key={version.id} className="hover:bg-gray-650 flex items-center justify-between rounded-lg border border-gray-600 bg-gray-700 p-4 transition-colors">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-semibold text-white">{version.name}</h4>
                      <Badge variant="secondary" className="bg-gray-600 text-xs text-gray-200">
                        {formatDate(version.createdAt)}
                      </Badge>
                    </div>
                    {version.description && <p className="mb-2 text-sm text-gray-300">{version.description}</p>}
                    <p className="text-xs text-gray-400">更新于 {formatDate(version.updatedAt)}</p>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoadVersion(version)}
                      className="h-8 w-8 border-gray-600 bg-gray-700 p-0 text-gray-300 hover:bg-gray-600 hover:text-white">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicateVersion(version)}
                      className="h-8 w-8 border-gray-600 bg-gray-700 p-0 text-gray-300 hover:bg-gray-600 hover:text-white">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteVersion(version.id)}
                      className="h-8 w-8 border-red-600 bg-gray-700 p-0 text-red-400 hover:bg-red-600 hover:text-white">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
