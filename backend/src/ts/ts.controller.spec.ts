import { Test, TestingModule } from '@nestjs/testing';
import { TsController } from './ts.controller';

describe('TsController', () => {
  let controller: TsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsController],
    }).compile();

    controller = module.get<TsController>(TsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
