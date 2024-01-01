import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIAssistantController } from './openai-assistant/openai-assistant.controller';
import { OpenAIService } from './openai.service';
import { OpenAIAssistantService } from './openai-assistant/openai-assistant.service';
import { SolarModule } from 'src/solar/solar.module';

@Module({
  imports: [ConfigModule, SolarModule],
  controllers: [OpenAIAssistantController],
  providers: [OpenAIService, OpenAIAssistantService],
})
export class OpenAIModule {}
