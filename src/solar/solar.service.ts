import { Injectable } from '@nestjs/common';

@Injectable()
export class SolarService {
  performSolarPanelCalculationsWithFinancialAnalysis(
    address: string,
    monthlyBill: number,
  ) {
    console.log(
      `Performing solar panel calculations for address '${address}' and monthly bill of ${monthlyBill} EUR.`,
    );
    return 'The output';
  }
}
