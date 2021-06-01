import { Request, Response } from 'express';

import { IGetRoomRequestParams, IGetRoomResponse } from 'common/types/requests/getRoom';

import { getDB } from 'server/db/getDB';

export default async function getRoom(req: Request<unknown, unknown, unknown, IGetRoomRequestParams>, res: Response) {
  const { id } = req.query;

  const db = await getDB();

  const room = db.rooms.find((r) => r.id === id);

  if (!room) {
    throw new Error('Нет такой комнаты');
  }

  const response: IGetRoomResponse = {
    room,
  };

  res.send(response);
}
