import { GoogleSolarPanelConfig } from './google-solar-panel-config';

export class GoogleSolarBuildingInsights {
  name: string;
  solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    solarPanelConfigs: GoogleSolarPanelConfig[];
  };
}
