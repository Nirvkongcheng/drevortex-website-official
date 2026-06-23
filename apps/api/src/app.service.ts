import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'drevertex-api',
      timestamp: new Date().toISOString(),
    };
  }

  getPublicSiteConfig() {
    return {
      siteName: 'Drevortex 梦启新创',
      siteNameEn: 'Drevortex',
      defaultTitle: 'Drevortex 梦启新创',
      defaultDescription:
        'Drevortex 梦启新创企业级官网重建项目初始化环境已就绪。',
      contactEmail: 'hello@drevortex.com',
      contactPhone: '+86 000-0000-0000',
      contactAddress: 'Hangzhou, China',
      footerCopyright: '© 2026 Drevortex. All rights reserved.',
    };
  }
}
