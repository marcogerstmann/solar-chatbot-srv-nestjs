import { Body, Controller, Post } from '@nestjs/common';
import { PotentialSavingsRequestDto } from './model/dto/potential-savings-request.dto';
import { SolarService } from './solar.service';
import { PotentialSavingsResponseDto } from './model/dto/potential-savings-response.dto';

@Controller('solar')
export class SolarController {
  constructor(private solarService: SolarService) {}

  @Post('potential-savings')
  async calculatePotentialSavings(
    @Body() request: PotentialSavingsRequestDto,
  ): Promise<PotentialSavingsResponseDto> {
    const installationSize = await this.solarService.getBestSolarInstallationSize(
      request.address,
      request.monthlyBill,
    );

    return {
      panelsCount: installationSize.panelsCount,
      totalSavingsWithSolar: installationSize.totalSavingsWithSolar,
    };
  }
}
