import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DtpModule } from './dtp/dtp.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './people/people.module';
import { TsModule } from './ts/ts.module';

@Module({
  imports: [
    DtpModule,
    AuthModule,
    UsersModule,
    PeopleModule,
    TsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}