import { Injectable, Logger } from '@nestjs/common';
import { GoogleSolarBuildingInsights } from '../model/google-solar-building-insights';
import { Coordinates } from 'src/geo/model/coordinates';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GeoService } from 'src/geo/geo.service';
import { CustomerSpecificService } from '../customer-specific/customer-specific.service';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleSolarApiService {
  private readonly logger = new Logger(GoogleSolarApiService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private geoService: GeoService,
    private customerSpecifics: CustomerSpecificService,
  ) {}

  async getBuildingInsightsForAddress(address: string): Promise<GoogleSolarBuildingInsights> {
    const coordinates = await this.geoService.getCoordinates(address);
    return await this.getBuildingInsightsForCoordinates(coordinates);
  }

  async getBuildingInsightsForCoordinates(
    coordinates: Coordinates,
  ): Promise<GoogleSolarBuildingInsights> {
    const googleCloudApiKey = this.configService.get<string>('GOOGLE_CLOUD_API_KEY');
    const solarApiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coordinates.latitude}&location.longitude=${coordinates.longitude}&requiredQuality=${this.customerSpecifics.minimumRequiredGoogleSolarApiImageQuality}&key=${googleCloudApiKey}`;
    const { data: buildingInsights } = await firstValueFrom(
      this.httpService.get<GoogleSolarBuildingInsights>(solarApiUrl).pipe(
        catchError(error => {
          this.logger.error(`Could not get buildingInsights from Google Solar API`, error);
          throw 'Could not get buildingInsights from Google Solar API';
        }),
      ),
    );
    return buildingInsights;
  }
}
