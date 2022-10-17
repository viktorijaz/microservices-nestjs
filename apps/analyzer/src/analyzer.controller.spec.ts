import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';

describe('AnalyzerController', () => {
  let analyzerController: AnalyzerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnalyzerController],
      providers: [AnalyzerService],
    }).compile();

    analyzerController = app.get<AnalyzerController>(AnalyzerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(analyzerController.getHello()).toBe('Hello World!');
    });
  });
});
