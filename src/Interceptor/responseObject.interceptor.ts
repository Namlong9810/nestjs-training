import { BooleanLiteralBuilder } from './../../node_modules/ast-types/gen/builders.d';
import { Reflector } from '@nestjs/core';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { SKIP_INTERCEPTOR } from 'src/decorator/skip-interceptor.decorator';

/**
 * Lớp xử lý response object format kiểu dữ liệu trả về trong api
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
@Injectable()
export class ResponseObject implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {

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
        console.log(data);
        // Xử lý response với arr 
        if (Array.isArray(data)) {
          return {
            timestamp: new Date().toISOString(),
            message: 'Request successfully',
            data: data,
          };
        }else {
        // Xử lý response với 1 object  
          return {
            timestamp: new Date().toISOString(),
            message: message || 'Request successfully',
            data: data,
          };
        }  
      })
    );      
  }
} 
