import { Test, TestingModule } from '@nestjs/testing';
import { DtpController } from './dtp.controller';

describe('DtpController', () => {
  let controller: DtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DtpController],
    }).compile();

    controller = module.get<DtpController>(DtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
