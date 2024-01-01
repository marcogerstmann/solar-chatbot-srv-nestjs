import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  constructor(private configService: ConfigService) {}

  getOpenAIClient() {
    return new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }
}
