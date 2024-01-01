import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenaiAssistantService } from './openai-assistant.service';
import { ChatDto } from '../models/dto/chat.dto';

@Controller('openai-assistant')
export class OpenaiAssistantController {
  constructor(private openaiAssistantService: OpenaiAssistantService) {}

  // TODO: This should be POST
  @Get('start')
  async startConversation(): Promise<{ threadId: string }> {
    const thread = await this.openaiAssistantService.createNewThread();
    return {
      threadId: thread.id,
    };
  }

  @Post('chat')
  chat(@Body() chatDto: ChatDto) {
    // TODO: Implement
    return { response: chatDto.message };
  }
}
