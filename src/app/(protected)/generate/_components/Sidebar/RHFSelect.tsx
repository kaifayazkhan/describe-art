import * as React from 'react';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/Select';

export type SelectOptions = {
  label: string;
  value: string | number;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  options: SelectOptions[];
};

export default function RHFSelect<T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      render={({ field, fieldState }) => (
        <div className='space-y-2'>
          <div className={`${fieldState.error?.message ? 'text-red-500' : ''}`}>
            {label}
          </div>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className='w-full' aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Aspect Ratio</SelectLabel>
                {options?.map((item) => (
                  <SelectItem
                    key={`${item.value}-${item.label}`}
                    value={`${item.value}`}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.error && (
            <p className='text-red-500'>{fieldState.error.message}</p>
          )}
        </div>
      )}
      name={name}
    />
  );
}
