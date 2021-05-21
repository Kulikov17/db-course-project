import { Module } from '@nestjs/common';
import { DtpService } from './dtp.service';
import { PeopleService } from '../people/people.service';
import { TsService } from '../ts/ts.service';
import { ConfigService } from 'src/config.service';
import { DtpController } from './dtp.controller';

@Module({
  controllers: [DtpController],
  providers: [DtpService, ConfigService, PeopleService, TsService]
})
export class DtpModule {}
