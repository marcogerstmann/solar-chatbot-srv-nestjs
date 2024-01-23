import { Controller, Get } from '@nestjs/common';

@Controller('info')
export class InfoController {
  @Get()
  info() {
    return 'Service is up';
  }
}
