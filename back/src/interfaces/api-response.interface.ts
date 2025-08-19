
export interface ApiResponseInterface <T = any> {
  
  success: boolean;
  statusCode : number;
  message?: string;
  data? : T
  timestamp: string;
  path: string;
  
}