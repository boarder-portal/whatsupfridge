import axios  from 'axios';

import { ICreateRoomResponse } from 'common/types/requests/createRoom';
import { IGetRoomRequestParams } from 'common/types/requests/getRoom';
import { IAddProductRequestParams, IAddProductResponse } from 'common/types/requests/addProduct';
import { IChangeProductsRequestParams, IChangeProductsResponse } from 'common/types/requests/changeProducts';

class HttpClient {
  async getRoom(params: IGetRoomRequestParams): Promise<ICreateRoomResponse> {
    return (await axios.get<ICreateRoomResponse>('/api/room', {
      params,
    })).data;
  }

  async createRoom(): Promise<ICreateRoomResponse> {
    return (await axios.post<ICreateRoomResponse>('/api/room/create')).data;
  }

  async addProduct(params: IAddProductRequestParams): Promise<IAddProductResponse> {
    return (await axios.post<IAddProductResponse>('/api/room/product/add', params)).data;
  }

  async changeProducts(
    params: IChangeProductsRequestParams,
  ): Promise<IChangeProductsResponse> {
    return (await axios.post<IChangeProductsResponse>('/api/room/products/change', params)).data;
  }
}

const httpClient = new HttpClient();

export default httpClient;
