import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StoreEntity } from './entities/store.entity';

export const GetStore = createParamDecorator(
  (_data, ctx: ExecutionContext): StoreEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
