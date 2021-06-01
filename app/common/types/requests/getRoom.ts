import { IRoom } from 'common/types/room';

export interface IGetRoomRequestParams {
  id: string;
}

export interface IGetRoomResponse {
  room: IRoom;
}
