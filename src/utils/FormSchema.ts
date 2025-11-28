import { z } from 'zod';
import { aspectRatio } from '@/utils/imageDimension';

const passwordSchema = z.string().min(8, {
  message: 'Password must be greater than or equal to 8 characters',
});

export const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: passwordSchema,
});

export type SingInInputs = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required.')
      .min(3, { message: 'Must be 3 or more characters long' })
      .max(30, { message: 'Name must be less than 30 words' }),
    email: z.string().nonempty('Email is required.').email(),
    password: passwordSchema,
    confirmPassword: z.string().nonempty('Confirm Password is required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type SingUpInputs = z.infer<typeof signUpSchema>;

export const forgotPasswordEmailSchema = z.object({
  email: z.string().nonempty('Email is required.').email(),
});

export type ForgotPasswordEmailInput = z.infer<
  typeof forgotPasswordEmailSchema
>;

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const GenerateImageSchema = z.object({
  prompt: z
    .string()
    .nonempty('Prompt is required')
    .min(4, { message: 'Prompt length must be greater than 4 characters' })
    .max(400, { message: 'Length cannot be greater than 500' }),
  imageCount: z.coerce.number().int().min(1).max(5),
  aspectRatio: z.enum(aspectRatio),
  model: z.coerce
    .number({ message: 'Select Model' })
    .int({ message: 'Select Model' }),
});

export type GenerateImageSchemaType = z.infer<typeof GenerateImageSchema>;

export const ContactSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required.')
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Name must be less than 30 words' }),
  email: z.string().nonempty('Email is required.').email(),
  subject: z
    .string()
    .nonempty('Subject is required')
    .min(10, { message: 'Subject must be 10 characters long' }),
  message: z.string().nonempty('Message is required.'),
});

export type ContactInputs = z.infer<typeof ContactSchema>;
