import { Injectable } from '@nestjs/common';
import { InstallationSize } from '../model/installation-size';

// TODO: Find another way of getting customer specific values
@Injectable()
export class CustomerSpecificService {
  costIncreaseFactor = 1.022;

  dcToAcRate = 0.85;

  discountRate = 1.04;

  efficiencyDepreciationFactor = 0.995;

  incentives = [];

  installationLifeSpan = 20;

  monthlyKwhEnergyConsumption = 300;

  averageCostPerKwh = 0.2;

  roofAreaCoveragePercentToAnalyze = 0.3;

  minimumRequiredGoogleSolarApiImageQuality: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';

  billCostModel = (energyConsumptionKwh: number): number =>
    energyConsumptionKwh * this.averageCostPerKwh;

  installationCostModel = (installationSize: InstallationSize): number =>
    installationSize.panelsCount + 10000;

  kwhConsumptionModel = (monthlyBill: number) => monthlyBill / this.averageCostPerKwh;
}
