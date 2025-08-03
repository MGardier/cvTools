import { Test, TestingModule } from '@nestjs/testing';
import { AuthCacheManagerService } from './cache-manager.service';

describe('AuthCacheManagerService', () => {
  let service: AuthCacheManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCacheManagerService],
    }).compile();

    service = module.get<AuthCacheManagerService>(AuthCacheManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
