import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIAssistantController as OpenAIAssistantController } from './openai-assistant.controller';

describe('OpenAIAssistantController', () => {
  let controller: OpenAIAssistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenAIAssistantController],
    }).compile();

    controller = module.get<OpenAIAssistantController>(
      OpenAIAssistantController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
