import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './openai/openai.module';
import { SolarModule } from './solar/solar.module';
import { GeoModule } from './geo/geo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenAIModule,
    SolarModule,
    OpenAIModule,
    GeoModule,
  ],
})
export class AppModule {}
