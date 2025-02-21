import { BooleanLiteralBuilder } from './../../node_modules/ast-types/gen/builders.d';
import { Reflector } from '@nestjs/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SKIP_INTERCEPTOR } from 'src/decorator/skip-interceptor.decorator';

@Injectable()
export class ResponseObject implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const isSkip = this.reflector.get<boolean>(
      SKIP_INTERCEPTOR,
      context.getHandler(),
    );

    if (isSkip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((dataResponse) => {
        const { message, data } = dataResponse ?? {};
        return {
          timestamp: new Date().toISOString(),
          message: message || 'Request successfully',
          data: data
        };
      }),
    );
  }
}
