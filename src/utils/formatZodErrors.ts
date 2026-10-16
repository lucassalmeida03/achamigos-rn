import { ZodError } from 'zod';

export function formatZodErrors(error: ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  error.issues.forEach((issue) => {

    const fieldName = issue.path[0] as string;


    if (fieldName && !formattedErrors[fieldName]) {
      formattedErrors[fieldName] = issue.message;
    }
  });

  return formattedErrors;
}