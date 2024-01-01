import { Module } from '@nestjs/common';
import { SolarService } from './solar.service';

@Module({
  providers: [SolarService]
})
export class SolarModule {}
