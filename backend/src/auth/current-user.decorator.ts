import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user
    console.log(user);
    if (!user) {
      return null
    }
    console.log(user);

    return data ? user[data] : user;
  }
);