import axios from 'axios';

import { ICreateRoomResponse } from 'common/types/requests/createRoom';

class HttpClient {
  async createRoom(): Promise<ICreateRoomResponse> {
    return axios.post('/api/room/create');
  }
}

const httpClient = new HttpClient();

export default httpClient;
