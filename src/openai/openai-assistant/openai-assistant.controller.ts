import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiAssistantService } from './openai-assistant.service';
import { ChatDto } from '../models/dto/chat.dto';

@Controller('openai-assistant')
export class OpenaiAssistantController {
  constructor(private openaiAssistantService: OpenaiAssistantService) {}

  @Post('start')
  async startConversation(): Promise<{ threadId: string }> {
    const thread = await this.openaiAssistantService.createNewThread();
    return {
      threadId: thread.id,
    };
  }

  @Post('chat')
  chat(@Body() chatDto: ChatDto): { response: string } {
    // TODO: Implement
    return { response: chatDto.message };
  }
}
