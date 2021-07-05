import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map(result => ({
          code: context.switchToHttp().getResponse().statusCode,
          message: '',
          meta: result.meta,
          data: result.data ? result.data : result,
        })),
        catchError(err => {
          if (err instanceof HttpException)
            return throwError(err);
          return throwError(new InternalServerErrorException())
        })
      );
  }
}
