import { z } from 'zod';

// Max size is 5MB.
// const MAX_FILE_SIZE = 5 * 1024 * 1024;

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') return true;
  }
  return false;
}

export const ElveSchema = z.object({
  name: z
    .string({ required_error: 'Name is required', invalid_type_error: 'The name must be a string' })
    .min(3, { message: 'Need at least three characters' }),
  image: z
    .any()
    // .refine((file: File) => file.size < MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine((file: File) => file?.length !== 0, 'File is required')
    .refine(() => checkFileType, 'Only .png, .jpg, .jpeg, .gif formats are supported.'),
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
