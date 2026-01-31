import * as React from 'react';
import { cn } from '../../lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-sm border border-sdi-gray-border bg-white px-4 py-3 transition-all',
          'focus:outline-none focus:ring-2 focus:ring-sdi-black focus:border-transparent',
          'placeholder:text-sdi-gray-text/70 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
