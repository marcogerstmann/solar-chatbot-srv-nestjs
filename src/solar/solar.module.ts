import { Module } from '@nestjs/common';
import { SolarService } from './solar.service';
import { GeoModule } from 'src/geo/geo.module';
import { CustomerSpecificService } from './customer-specific/customer-specific.service';
import { GoogleSolarApiService } from './google-solar-api/google-solar-api.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SolarController } from './solar.controller';

@Module({
  imports: [ConfigModule, HttpModule, GeoModule],
  providers: [SolarService, CustomerSpecificService, GoogleSolarApiService],
  exports: [SolarService],
  controllers: [SolarController],
})
export class SolarModule {}
