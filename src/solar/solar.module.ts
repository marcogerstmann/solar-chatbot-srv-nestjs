import { Module } from '@nestjs/common';
import { SolarService } from './solar.service';
import { GeoModule } from 'src/geo/geo.module';

@Module({
  imports: [GeoModule],
  providers: [SolarService],
  exports: [SolarService],
})
export class SolarModule {}
