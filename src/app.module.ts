import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenAIModule],
})
export class AppModule {}
