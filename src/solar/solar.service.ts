import { Injectable } from '@nestjs/common';
import { GoogleSolarApiService } from './google-solar-api/google-solar-api.service';
import { InstallationSize } from './model/installation-size';
import { GoogleSolarBuildingInsights } from './model/google-solar-building-insights';
import { CustomerSpecificService } from './customer-specific/customer-specific.service';

@Injectable()
export class SolarService {
  constructor(
    private googleSolarApiService: GoogleSolarApiService,
    private customerSpecifics: CustomerSpecificService,
  ) {}

  async performSolarPanelCalculationsWithFinancialAnalysis(
    address: string,
    monthlyBill: number,
  ): InstallationSize {
    const buildingInsights =
      await this.googleSolarApiService.getBuildingInsightsForAddress(address);
    const bestInstallationSize = this.getInstallationSizeWithDesiredFinancialBenefits(
      buildingInsights,
      monthlyBill,
    );
    return Promise.resolve(bestInstallationSize);
  }

  private getInstallationSizeWithDesiredFinancialBenefits(
    buildingInsights: GoogleSolarBuildingInsights,
    monthlyBill: number,
  ): InstallationSize {
    const analyzedInstallationSizes = this.getAnalyzedInstallationSizes(
      buildingInsights,
      monthlyBill,
    );
    // TODO: Implement this
    // return this.findClosesAnalyzedInstallationSizeForRoofAreaCoverage(
    //   buildingInsights,
    //   analyzedInstallationSizes,
    //   this.customerSpecifics.roofAreaCoveragePercentToAnalyze,
    // );
  }

  private getAnalyzedInstallationSizes(
    buildingInsights: GoogleSolarBuildingInsights,
    monthlyBill: number,
  ): InstallationSize[] {
    let installationSizes = [
      ...buildingInsights.solarPotential.solarPanelConfigs,
    ] as InstallationSize[];

    // Calculate the annual energy consumption of the household at the input location
    const yearlyKwhEnergyConsumption = this.customerSpecifics.kwhConsumptionModel(monthlyBill) * 12;

    // Calculate the annual solar energy AC production of each installation_size the API proposes
    installationSizes.forEach(installationSize => {
      installationSize.initialAcKwhPerYear =
        installationSize.yearlyEnergyDcKwh * this.customerSpecifics.dcToAcRate;
    });
  }
}
