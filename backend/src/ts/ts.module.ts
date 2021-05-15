import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config.service';
import { TsController } from './ts.controller';
import { TsService } from './ts.service';
import { PeopleService } from '../people/people.service';

@Module({
  controllers: [TsController],
  providers: [TsService, ConfigService, PeopleService]
})
export class TsModule {}