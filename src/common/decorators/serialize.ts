import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors';
import { ClassConstructor } from '../interfaces';

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
