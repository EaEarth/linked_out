import { Test, TestingModule } from '@nestjs/testing';
import { JobDetailController } from './job-detail.controller';

describe('JobDetailController', () => {
  let controller: JobDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobDetailController],
    }).compile();

    controller = module.get<JobDetailController>(JobDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
