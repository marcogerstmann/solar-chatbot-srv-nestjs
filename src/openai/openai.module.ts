import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIAssistantController } from './openai-assistant/openai-assistant.controller';
import { OpenAIService } from './openai.service';
import { OpenAIAssistantService } from './openai-assistant/openai-assistant.service';
import { SolarService } from 'src/solar/solar.service';

@Module({
  imports: [ConfigModule],
  controllers: [OpenAIAssistantController],
  providers: [OpenAIService, OpenAIAssistantService, SolarService],
})
export class OpenAIModule {}
