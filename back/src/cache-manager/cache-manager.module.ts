import { Module } from '@nestjs/common';

import { createKeyv } from '@keyv/redis';
import { Cacheable } from 'cacheable';
import { CacheManagerService } from './cache-manager.service';

@Module({
  providers: [
    CacheManagerService,
    {
      provide: 'CACHE_INSTANCE',
      useFactory: () => {
        const secondary = createKeyv(process.env.REDIS_URL);
        return new Cacheable({ secondary, ttl: '4h' });
      },
    },
  ],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
