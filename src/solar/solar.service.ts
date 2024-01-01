import { Injectable } from '@nestjs/common';
import { GeoService } from 'src/geo/geo.service';

@Injectable()
export class SolarService {
  constructor(private geoService: GeoService) {}

  async performSolarPanelCalculationsWithFinancialAnalysis(
    address: string,
    monthlyBill: number,
  ) {
    // TODO: Implement
    return { address, monthlyBill };
    // const solarData = await this.getSolarDataForAddress(address);
    // return performFinancialAnalysis(solarData, monthlyBill);
  }

  // private async getSolarDataForAddress(address: string) {
  // const coordinates = await this.geoService.getCoordinates(address);
  // return getSolarDataForCoordinates(lat, lng);
  // }
}
