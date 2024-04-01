import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import * as React from 'react';
import { useForm, UseFormReturn, SubmitHandler, UseFormProps, FieldValues } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ ...options, resolver: schema && zodResolver(schema) });
  console.log('form props', { id, options, onSubmit, schema, className, children, methods });

  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log('errors', errors))}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
