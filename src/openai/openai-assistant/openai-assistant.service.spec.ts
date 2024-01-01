import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIAssistantService as OpenAIAssistantService } from './openai-assistant.service';

describe('OpenAIAssistantService', () => {
  let service: OpenAIAssistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIAssistantService],
    }).compile();

    service = module.get<OpenAIAssistantService>(OpenAIAssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
