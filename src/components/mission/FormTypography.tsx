import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { btn } from '@/components/site/ui';

export function FormQuestion({ children }: { children: ReactNode }) {
  return <h1 tabIndex={-1} className="type-question mb-8">{children}</h1>;
}
export function FormInput({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn('type-answer min-w-0 w-full border-0 border-b border-input bg-card px-3 py-4 outline-none placeholder:text-muted-foreground focus:border-brand-teal-bright', className)} {...props} />;
}
export function FormLabel({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('eyebrow', className)} {...props} />;
}
export function ChoiceCard({ selected, className, ...props }: ButtonProps & { selected: boolean }) {
  return <Button variant="outline" aria-pressed={selected} className={cn('h-auto min-h-20 flex-col items-start whitespace-normal rounded-sm p-4 text-left font-normal', selected ? 'border-brand-teal-bright bg-brand-teal-deep/25 text-brand-teal-bright' : 'border-input', className)} {...props} />;
}
export function ChipSelect({ selected, className, ...props }: ButtonProps & { selected: boolean }) {
  return <Button variant="outline" aria-pressed={selected} className={cn('h-auto min-h-9 max-w-full whitespace-normal text-sm font-normal', selected ? 'border-brand-teal-bright bg-brand-teal-deep/25 text-brand-teal-bright' : 'border-input', className)} {...props} />;
}
export function PrimaryButton({ className, ...props }: ButtonProps) {
  return <Button className={cn(btn(), 'h-auto', className)} {...props} />;
}