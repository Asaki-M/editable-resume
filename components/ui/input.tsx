import * as React from 'react';

import { cn } from '~/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded-lg border border-slate-300/50 bg-white/90 px-3 py-2 text-base text-slate-800 shadow-sm backdrop-blur-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:bg-white focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400/20',
        'aria-invalid:border-red-400 aria-invalid:ring-red-400/20',
        className
      )}
      {...props}
    />
  );
}

export { Input };
