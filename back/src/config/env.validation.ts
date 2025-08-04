// config/env.validation.ts
import { envSchema, EnvConfig } from './env.schema';

export function validateEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    const errorMessages = result.error.issues.map(
      err => `${err.path.join('.')}: ${err.message}`
    );
    
    console.error('❌ Environment validation failed:');
    errorMessages.forEach(msg => console.error(`  - ${msg}`));
    
    throw new Error('Invalid environment configuration');
  }
  
  console.log('✅ Environment validation successful');
  return result.data;
}