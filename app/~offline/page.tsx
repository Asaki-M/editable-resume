export default function OfflinePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-4xl font-bold">离线模式</h1>
      <p className="mb-8 text-xl">您当前处于离线状态</p>
      <div className="bg-card border-border rounded-lg border p-4">
        <p className="text-muted-foreground">请检查您的网络连接</p>
      </div>
    </div>
  );
}
