import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenAIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
