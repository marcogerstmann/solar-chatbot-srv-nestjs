import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './openai/openai.module';
import { SolarModule } from './solar/solar.module';
import { GeoModule } from './geo/geo.module';
import { InfoController } from './info/info.controller';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenAIModule,
    SolarModule,
    OpenAIModule,
    GeoModule,
    LeadsModule,
  ],
  controllers: [InfoController],
})
export class AppModule {}
