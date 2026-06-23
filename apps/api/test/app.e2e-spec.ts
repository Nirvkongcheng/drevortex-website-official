import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(({ body }) => {
        const payload = body as Record<string, unknown>;

        expect(payload.status).toBe('ok');
        expect(payload.service).toBe('drevertex-api');
      });
  });

  it('/api/public/site-config (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/public/site-config')
      .expect(200)
      .expect(({ body }) => {
        const payload = body as Record<string, unknown>;

        expect(payload.siteName).toBe('Drevortex 梦启新创');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
