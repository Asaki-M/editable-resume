import * as React from 'react';

import { cn } from '~/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full resize-none rounded-lg border border-slate-300/50 bg-white/90 px-3 py-3 text-sm text-slate-800 shadow-sm backdrop-blur-sm transition-all placeholder:text-slate-500 hover:bg-white focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
