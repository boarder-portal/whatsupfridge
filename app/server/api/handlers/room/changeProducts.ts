import { Request, Response } from 'express';

import { IChangeProductsRequestParams, IChangeProductsResponse } from 'common/types/requests/changeProducts';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function changeProducts(
  req: Request<unknown, unknown, IChangeProductsRequestParams>,
  res: Response,
) {
  const { roomId, products } = req.body;

  const db = await getDB();

  const room = db.rooms.find((r) => r.id === roomId);

  if (!room) {
    throw new Error('Нет такой комнаты');
  }

  room.products = products;

  await writeDB(db);

  const response: IChangeProductsResponse = {
    products,
  };

  res.send(response);
}
