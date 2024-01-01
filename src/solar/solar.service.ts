import { Injectable } from '@nestjs/common';
import { GoogleSolarApiService } from './google-solar-api/google-solar-api.service';

@Injectable()
export class SolarService {
  constructor(private googleSolarApiService: GoogleSolarApiService) {}

  async performSolarPanelCalculationsWithFinancialAnalysis(
    address: string,
    monthlyBill: number,
  ) {
    const buildingInsights =
      await this.googleSolarApiService.getBuildingInsightsForAddress(address);
    // TODO: Implement financial analysis of the buildingInsights
    // return performFinancialAnalysis(solarData, monthlyBill);
    return { address, monthlyBill };
  }
}
