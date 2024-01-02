import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Coordinates } from './model/coordinates';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getCoordinates(address: string): Promise<Coordinates> {
    const googleCloudApiKey = this.configService.get<string>('GOOGLE_CLOUD_API_KEY');
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleCloudApiKey}`;
    return await firstValueFrom(
      this.httpService.get(geocodingUrl).pipe(
        map(response => {
          const location = response.data.results[0].geometry.location;
          this.logger.log(
            `Coordinates for address '${address}': Lat: ${location.lat}, Lng: ${location.lng}`,
          );
          return { latitude: location.lat, longitude: location.lng };
        }),
        catchError(error => {
          this.logger.error(`Could not get coordinates for address: '${address}'`, error);
          throw 'Could not get coordinates for address';
        }),
      ),
    );
  }
}
