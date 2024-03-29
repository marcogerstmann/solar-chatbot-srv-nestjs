import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import { ChatDto } from '../model/dto/chat.dto';
import { Thread } from 'openai/resources/beta/threads/threads';
import { ConfigService } from '@nestjs/config';
import { SolarService } from 'src/solar/solar.service';

@Injectable()
export class OpenAIAssistantService {
  private readonly logger = new Logger(OpenAIAssistantService.name);

  constructor(
    private configService: ConfigService,
    private openAIService: OpenAIService,
    private solarService: SolarService,
  ) {}

  async createNewThread(): Promise<Thread> {
    const openai = this.openAIService.getOpenAIClient();
    return await openai.beta.threads.create();
  }

  async handleChatMessage(chatDto: ChatDto): Promise<{
    answer: string;
    isError?: boolean;
  }> {
    const openai = this.openAIService.getOpenAIClient();

    if (!chatDto.threadId) {
      return {
        isError: true,
        answer: 'Missing threadId',
      };
    }

    // Add users message to the OpenAI thread
    openai.beta.threads.messages.create(chatDto.threadId, {
      role: 'user',
      content: chatDto.message,
    });

    // Run the OpenAI assistant
    let run = await openai.beta.threads.runs.create(chatDto.threadId, {
      assistant_id: this.configService.get<string>('OPENAI_ASSISTANT_ID'),
    });

    while (run.status !== 'completed') {
      await this.sleep(2000);
      run = await openai.beta.threads.runs.retrieve(chatDto.threadId, run.id);

      if (run.status === 'failed') {
        this.logger.error('OpenAI client run failed: ', run.last_error);
        break;
      }

      if (run.status === 'requires_action') {
        // TODO: Make this whole block more generic
        for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
          // TODO: Use constants for the function names of the OpenAI assist
          if (toolCall.function.name === 'solarPanelCalculations') {
            const functionArguments = JSON.parse(toolCall.function.arguments);
            const bestSolarInstallationSize = await this.solarService.getBestSolarInstallationSize(
              functionArguments.address,
              functionArguments.monthlyBill,
            );
            openai.beta.threads.runs.submitToolOutputs(chatDto.threadId, run.id, {
              tool_outputs: [
                {
                  tool_call_id: toolCall.id,
                  output: JSON.stringify(bestSolarInstallationSize),
                },
              ],
            });
          }
        }
      }
    }

    // Retrieve and return the latest message from the OpenAI assistant
    const messages = await openai.beta.threads.messages.list(chatDto.threadId);
    const latestMessage = (<any>messages.data[0].content[0]).text.value;

    return { answer: latestMessage };
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
