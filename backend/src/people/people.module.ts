import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config.service';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, ConfigService]
})
export class PeopleModule {}
