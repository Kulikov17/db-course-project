import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from 'src/config.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ConfigService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
