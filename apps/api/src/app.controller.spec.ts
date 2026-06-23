import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return api health payload', () => {
      const health = appController.getHealth();

      expect(health.status).toBe('ok');
      expect(health.service).toBe('drevertex-api');
      expect(health.timestamp).toBeDefined();
    });
  });

  describe('site config', () => {
    it('should return public site config payload', () => {
      const siteConfig = appController.getPublicSiteConfig();

      expect(siteConfig.siteName).toBe('Drevortex 梦启新创');
      expect(siteConfig.siteNameEn).toBe('Drevortex');
    });
  });
});
