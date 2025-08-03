export interface ResponseInterface<T> {
  data: T;
  success: boolean;
  errorCode?: string;
  timestamp: Date;
}
