import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './openai/openai.module';
import { SolarModule } from './solar/solar.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenAIModule, SolarModule],
})
export class AppModule {}
