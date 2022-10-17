import { Test, TestingModule } from '@nestjs/testing';
import { CommunicatorController } from './communicator.controller';
import { CommunicatorService } from './communicator.service';

describe('CommunicatorController', () => {
  let communicatorController: CommunicatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommunicatorController],
      providers: [CommunicatorService],
    }).compile();

    communicatorController = app.get<CommunicatorController>(CommunicatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(communicatorController.getHello()).toBe('Hello World!');
    });
  });
});
