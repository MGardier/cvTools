import { Injectable } from '@nestjs/common';
import { timestamp } from 'rxjs';

// S'occuper du formatage de données

@Injectable()
export class ResponseService {
  format<T>(data: T, success: boolean = true, errorCode?: string) {
    return { data, success, errorCode, timestamp: new Date() };
  }
}
