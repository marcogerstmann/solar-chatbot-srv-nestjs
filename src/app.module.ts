import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './openai/openai.module';
import { SolarModule } from './solar/solar.module';
import { GeoModule } from './geo/geo.module';
import { InfoController } from './info/info.controller';

@Module({
  imports: [ConfigModule.forRoot(), OpenAIModule, SolarModule, OpenAIModule, GeoModule],
  controllers: [InfoController],
})
export class AppModule {}
