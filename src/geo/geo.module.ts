import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
