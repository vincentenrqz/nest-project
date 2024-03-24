import { Test, TestingModule } from '@nestjs/testing';
import { TasktypesController } from './tasktypes.controller';
import { TasktypesService } from './tasktypes.service';

describe('TasktypesController', () => {
  let controller: TasktypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasktypesController],
      providers: [TasktypesService],
    }).compile();

    controller = module.get<TasktypesController>(TasktypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
