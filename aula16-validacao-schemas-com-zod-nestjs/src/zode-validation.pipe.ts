import { PipeTransform,
     ArgumentMetadata,
      BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parseResult = this.schema.safeParse(value);

    if (!parseResult.success) {
      const formattedErrors = parseResult.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        message: issue.message,
      }));
      throw new BadRequestException({
        statusCode: 400,
        erros: formattedErrors,
      });
    }

    return parseResult.data;
  }
}