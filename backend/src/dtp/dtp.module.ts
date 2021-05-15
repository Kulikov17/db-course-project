import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DtpService } from './dtp.service';
import { DtpController } from './dtp.controller';
import { Dtp } from './dtp.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    //TypeOrmModule.forFeature([Dtp]),
  ],
  controllers: [DtpController],
  providers: [DtpService, UsersService],
})
export class DtpModule {}
