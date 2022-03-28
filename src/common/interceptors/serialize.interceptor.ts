import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ClassConstructor } from '../interfaces/types';

const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        map((data: any) =>
          plainToInstance(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}

export { Serialize, SerializeInterceptor };
