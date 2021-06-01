import { IProduct } from 'common/types/room';

export interface IAddProductRequestParams {
  roomId: string;
  name: string;
}

export interface IAddProductResponse {
  product: IProduct;
}
