import * as React from 'react';
import { cn } from '../../lib/utils';

// 스타일
const buttonVariants = {
  default: 'bg-sdi-black text-white hover:bg-sdi-black/90 shadow-sm',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline:
    'border border-sdi-gray-border bg-white hover:bg-sdi-gray-bg text-sdi-black',
  secondary: 'bg-sdi-gray-bg text-sdi-black hover:bg-sdi-gray-border',
  ghost: 'hover:bg-sdi-gray-bg text-sdi-black',
} as const;

// 크기 스타일 정의 (하드코딩 제거 및 모듈화)
const buttonSizes = {
  default: 'h-12 px-6 py-3',
  sm: 'h-9 px-3 text-sm',
  lg: 'h-14 px-8 text-lg',
  icon: 'h-10 w-10',
} as const;

// 위 객체의 키값
type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-semibold transition-colors',
          'disabled:opacity-50 disabled:pointer-events-none',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
