import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSpecificService } from './customer-specific.service';

describe('CustomerSpecificService', () => {
  let service: CustomerSpecificService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSpecificService],
    }).compile();

    service = module.get<CustomerSpecificService>(CustomerSpecificService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
