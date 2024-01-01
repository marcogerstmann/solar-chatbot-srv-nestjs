import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OpenAIAssistantService } from './openai-assistant.service';
import { ChatDto } from '../model/dto/chat.dto';

@Controller('openai-assistant')
export class OpenAIAssistantController {
  constructor(private openAIAssistantService: OpenAIAssistantService) {}

  @Post('start')
  async startConversation(): Promise<{ threadId: string }> {
    const thread = await this.openAIAssistantService.createNewThread();
    return {
      threadId: thread.id,
    };
  }

  @Post('chat')
  async chat(@Body() request: ChatDto): Promise<{ response: string }> {
    const response =
      await this.openAIAssistantService.handleChatMessage(request);

    if (response.isError) {
      throw new HttpException(response.answer, HttpStatus.BAD_REQUEST);
    }

    return { response: response.answer };
  }
}
