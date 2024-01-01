import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai.service';

@Injectable()
export class OpenaiAssistantService {
  constructor(private openAIService: OpenAIService) {}

  async createNewThread() {
    const openai = this.openAIService.getOpenAIClient();
    return await openai.beta.threads.create();
  }
}
