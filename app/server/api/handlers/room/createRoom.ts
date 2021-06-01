import { Request, Response } from 'express';
import uuid from 'uuid';

import { IRoom } from 'common/types/room';
import { ICreateRoomResponse } from 'common/types/requests/createRoom';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function createRoom(req: Request, res: Response) {
  const db = await getDB();

  const newRoom: IRoom = {
    id: uuid(),
    products: [],
  };

  db.rooms.push(newRoom);

  await writeDB(db);

  const response: ICreateRoomResponse = {
    room: newRoom,
  };

  res.send(response);
}
