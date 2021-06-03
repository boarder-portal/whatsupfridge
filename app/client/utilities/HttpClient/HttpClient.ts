import { ICreateRoomResponse } from 'common/types/requests/createRoom';
import { IGetRoomRequestParams } from 'common/types/requests/getRoom';
import {
  IAddProductRequestParams,
  IAddProductResponse,
} from 'common/types/requests/addProduct';
import {
  IChangeProductsRequestParams,
  IChangeProductsResponse,
} from 'common/types/requests/changeProducts';

class HttpClient {
  async get(url: string, params?: any) {
    const rawResponse = await fetch(`${url}?${new URLSearchParams(params)}`);

    return rawResponse.json();
  }

  async post(url: string, params?: any) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return await rawResponse.json();
  }

  async getRoom(params: IGetRoomRequestParams): Promise<ICreateRoomResponse> {
    return this.get('/api/room', params);
  }

  async createRoom(): Promise<ICreateRoomResponse> {
    return this.post('/api/room/create');
  }

  async addProduct(
    params: IAddProductRequestParams,
  ): Promise<IAddProductResponse> {
    return this.post('/api/room/product/add', params);
  }

  async changeProducts(
    params: IChangeProductsRequestParams,
  ): Promise<IChangeProductsResponse> {
    return this.post('/api/room/products/change', params);
  }
}

const httpClient = new HttpClient();

export default httpClient;
