export class GoogleSolarBuildingInsights {
  name: string;
  solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    solarPanelConfigs: [
      {
        panelsCount: number;
        yearlyEnergyDcKwh: number;
      },
    ];
  };
}
