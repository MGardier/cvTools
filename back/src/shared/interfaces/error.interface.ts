import { StandardResponseInterface } from './standard-response.interface';

export interface ErrorInterface extends StandardResponseInterface{

  error: string;

}