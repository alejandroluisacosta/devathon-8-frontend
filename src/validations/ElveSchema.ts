import { z } from 'zod';

export const ElveSchema = z.object({
  name: z
    .string({ required_error: 'Name is required', invalid_type_error: 'The name must be a string' })
    .min(3, { message: 'Need at least three characters' }),
  image: z.string({ invalid_type_error: 'The image must be a string link' }),
  email: z
    .string({ required_error: 'Email is required', invalid_type_error: 'The email must be a string' })
    .email({ message: 'Invalid email' }),
  age: z.coerce
    .number({ required_error: 'Age is required', invalid_type_error: 'Age must be a number' })
    .min(18, { message: "The elves can't work before eighteen" })
    .max(999, { message: 'The elves with a mileny of years being retired' }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'The address must be a string',
  }),
  height: z.coerce.number({
    required_error: 'Height is required',
    invalid_type_error: 'The height must be a number',
  }),
});

export type Elve = z.infer<typeof ElveSchema>;
