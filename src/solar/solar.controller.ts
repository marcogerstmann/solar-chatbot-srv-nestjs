import { Body, Controller, Post } from '@nestjs/common';
import { PotentialSolarSavingsDto } from './model/dto/potential-solar-savings.dto';
import { SolarService } from './solar.service';

@Controller('solar')
export class SolarController {
  constructor(private solarService: SolarService) {}

  @Post('potential-savings')
  async calculatePotentialSavings(@Body() request: PotentialSolarSavingsDto) {
    return await this.solarService.performSolarPanelCalculationsWithFinancialAnalysis(
      request.address,
      request.monthlyBill,
    );
  }
}
