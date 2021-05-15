import { Test, TestingModule } from '@nestjs/testing';
import { TsService } from './ts.service';

describe('TsService', () => {
  let service: TsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsService],
    }).compile();

    service = module.get<TsService>(TsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
