import { IProduct } from 'common/types/room';

export interface IChangeProductsRequestParams {
  roomId: string;
  products: IProduct[];
}

export interface IChangeProductsResponse {
  products: IProduct[];
}
