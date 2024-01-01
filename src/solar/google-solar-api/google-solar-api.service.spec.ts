import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSolarApiService } from './google-solar-api.service';

describe('GoogleSolarApiService', () => {
  let service: GoogleSolarApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSolarApiService],
    }).compile();

    service = module.get<GoogleSolarApiService>(GoogleSolarApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
