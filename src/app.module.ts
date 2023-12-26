import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YearController } from './year/year.controller';

@Module({
  imports: [],
  controllers: [AppController, YearController],
  providers: [AppService],
})
export class AppModule {}
