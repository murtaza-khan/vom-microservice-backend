import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // (data, [root, args, ctx, info]) => ctx.req.user,
  (data, ctx) => {
    return ctx.req.user
  }

);
