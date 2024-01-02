import { GoogleSolarPanelConfig } from './google-solar-panel-config';

export class InstallationSize extends GoogleSolarPanelConfig {
  initialAcKwhPerYear: number;
  lifetimeProductionAcKwh: number;
  annualUtilityBillEstimates: number[];
  lifetimeCostOfElectricityWithoutSolar: number;
  installationCost: number;
  totalCostWithSolar: number;
  totalSavingsWithSolar: number;
}
