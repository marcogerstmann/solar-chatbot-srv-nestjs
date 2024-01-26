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

  async getBestSolarInstallationSize(
    address: string,
    monthlyBill: number,
  ): Promise<InstallationSize> {
    const buildingInsights =
      await this.googleSolarApiService.getBuildingInsightsForAddress(address);
    const bestInstallationSize = this.getInstallationSizeWithMaxFinancialBenefits(
      buildingInsights,
      monthlyBill,
    );
    return Promise.resolve(bestInstallationSize);
  }

  private getInstallationSizeWithMaxFinancialBenefits(
    buildingInsights: GoogleSolarBuildingInsights,
    monthlyBill: number,
  ): InstallationSize {
    const analyzedInstallationSizes = this.getAnalyzedInstallationSizes(
      buildingInsights,
      monthlyBill,
    );
    return this.findWithMaxSavings(analyzedInstallationSizes);
  }

  /**
   * The comments within this function are from the official guide to calculate solar
   * costs and savings for non-US locations.
   * See: https://developers.google.com/maps/documentation/solar/calculate-costs-non-us?hl=en
   */
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

    // Remove from consideration any SolarPanelConfig instances that produce more electricity than the household consumes annually
    installationSizes = installationSizes.filter(
      installationSize => installationSize.initialAcKwhPerYear <= yearlyKwhEnergyConsumption,
    );

    installationSizes.forEach(installationSize => {
      // Calculate the lifetime solar energy production of each returned installation_size
      installationSize.lifetimeProductionAcKwh = this.calculateLifetimeProductionAcKwh(
        installationSize.yearlyEnergyDcKwh,
      );

      // Calculate the lifetime cost of energy consumption if the installationSize is installed (annually)
      installationSize.annualUtilityBillEstimates = this.calculateAnnualUtilityBillEstimates(
        installationSize.initialAcKwhPerYear,
        yearlyKwhEnergyConsumption,
      );

      // Calculate the lifetime cost of electricity if a solar installation is not installed
      installationSize.lifetimeCostOfElectricityWithoutSolar =
        this.calculateLifetimeCostOfElectricityWithoutSolar(monthlyBill);

      // For each installation size, calculate the installation cost
      installationSize.installationCost =
        this.customerSpecifics.installationCostModel(installationSize);

      // Add up any monetary incentives
      const monetaryIncentives = this.calculateMonetaryIncentives(installationSize);

      // For each installation size, calculate the total costs associated with installing solar
      installationSize.totalCostWithSolar = this.calculateTotalCostWithSolar(
        installationSize.installationCost,
        installationSize.annualUtilityBillEstimates,
        monetaryIncentives,
      );

      // For each installation size, calculate the total savings associated with installing solar
      installationSize.totalSavingsWithSolar = this.calculateTotalSavingsWithSolar(
        installationSize.lifetimeCostOfElectricityWithoutSolar,
        installationSize.totalCostWithSolar,
      );
    });

    return installationSizes;
  }

  private calculateLifetimeProductionAcKwh(yearlyEnergyDcKwh: number): number {
    return (
      (this.customerSpecifics.dcToAcRate *
        yearlyEnergyDcKwh *
        (1 -
          Math.pow(
            this.customerSpecifics.efficiencyDepreciationFactor,
            this.customerSpecifics.installationLifeSpan,
          ))) /
      (1 - this.customerSpecifics.efficiencyDepreciationFactor)
    );
  }

  private calculateAnnualUtilityBillEstimates(
    initialAcKwhPerYear: number,
    yearlyKwhEnergyConsumption: number,
  ): number[] {
    const lifetimeUtilityBill: number[] = new Array(
      this.customerSpecifics.installationLifeSpan,
    ).fill(0);
    for (let year = 0; year < this.customerSpecifics.installationLifeSpan; year++) {
      lifetimeUtilityBill[year] = this.calculateAnnualUtilityBillEstimate(
        yearlyKwhEnergyConsumption,
        year,
        initialAcKwhPerYear,
      );
    }
    return lifetimeUtilityBill;
  }

  private calculateAnnualUtilityBillEstimate(
    yearlyKwhEnergyConsumption: number,
    year: number,
    initialAcKwhPerYear: number,
  ): number {
    return (
      (this.customerSpecifics.billCostModel(
        yearlyKwhEnergyConsumption -
          this.calculateProductionAcKwhForYear(initialAcKwhPerYear, year),
      ) *
        Math.pow(this.customerSpecifics.costIncreaseFactor, year)) /
      Math.pow(this.customerSpecifics.discountRate, year)
    );
  }

  private calculateProductionAcKwhForYear(initialAcKwhPerYear: number, year: number): number {
    // TODO: Is this formula correct? Look again into the Google API documentation and search for the string: "Yearly solar energy production (kWh)"
    return year + initialAcKwhPerYear * this.customerSpecifics.efficiencyDepreciationFactor;
  }

  private calculateLifetimeCostOfElectricityWithoutSolar(monthlyBill: number): number {
    return (
      (monthlyBill *
        12 *
        (1 -
          Math.pow(
            this.customerSpecifics.costIncreaseFactor / this.customerSpecifics.discountRate,
            this.customerSpecifics.installationLifeSpan,
          ))) /
      (1 - this.customerSpecifics.costIncreaseFactor / this.customerSpecifics.discountRate)
    );
  }

  private calculateMonetaryIncentives(installationSize: InstallationSize): number {
    return installationSize.panelsCount * 0; // For now always 0
  }

  private calculateTotalCostWithSolar(
    installationCost: number,
    annualUtilityBillEstimates: number[],
    monetaryIncentives: number,
  ): number {
    const lifetimeUtilityBill = annualUtilityBillEstimates.reduce((acc, curr) => acc + curr, 0);
    return installationCost + lifetimeUtilityBill - monetaryIncentives;
  }

  private calculateTotalSavingsWithSolar(
    lifetimeCostOfElectricityWithoutSolar: number,
    totalCostWithSolar: number,
  ): number {
    return lifetimeCostOfElectricityWithoutSolar - totalCostWithSolar;
  }

  private findWithMaxSavings(analyzedInstallationSizes: InstallationSize[]): InstallationSize {
    return analyzedInstallationSizes.reduce((max, installationSize) =>
      max.totalSavingsWithSolar > installationSize.totalSavingsWithSolar ? max : installationSize,
    );
  }
}
