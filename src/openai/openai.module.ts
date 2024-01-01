import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenaiAssistantService } from './openai-assistant/openai-assistant.service';
import { OpenaiAssistantController } from './openai-assistant/openai-assistant.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OpenaiAssistantController],
  providers: [OpenAIService, OpenaiAssistantService],
})
export class OpenAIModule {}
