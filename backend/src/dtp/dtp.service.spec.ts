import { Test, TestingModule } from '@nestjs/testing';
import { DtpService } from './dtp.service';

describe('DtpService', () => {
  let service: DtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DtpService],
    }).compile();

    service = module.get<DtpService>(DtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
