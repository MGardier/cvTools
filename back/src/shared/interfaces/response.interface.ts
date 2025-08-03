import { StandardResponseInterface } from "./standard-response.interface";

export interface ResponseInterface<T> extends StandardResponseInterface {

  data: T
  
}