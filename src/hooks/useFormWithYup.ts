import { yupResolver } from '@hookform/resolvers/yup';
import type { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ObjectSchema } from 'yup';

export const useFormWithYup = <T = any>(
  schema: ObjectSchema<any, any, any>,
  defaultValues?: UnpackNestedValue<DeepPartial<T>>
) => {
  return useForm<T>({ resolver: yupResolver(schema), defaultValues });
};
