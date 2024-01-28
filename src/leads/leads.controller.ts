import { Body, Controller, Post } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CaptureLeadRequestDto } from './model/dto/capture-lead-request.dto';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Post('google-spreadsheet')
  async captureLeadToGoogleSpreadsheet(@Body() request: CaptureLeadRequestDto) {
    await this.leadsService.captureToGoogleSpreadsheet({
      name: request.name,
      address: request.address,
      phone: request.phone,
    });
  }
}
