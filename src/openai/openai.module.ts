import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIAssistantService } from './openai-assistant/openai-assistant.service';
import { OpenAIAssistantController as OpenAIAssistantController } from './openai-assistant/openai-assistant.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OpenAIAssistantController],
  providers: [OpenAIService, OpenAIAssistantService],
})
export class OpenAIModule {}
