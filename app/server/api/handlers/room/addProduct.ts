import { Request, Response } from 'express';

import { IProduct } from 'common/types/room';
import { IAddProductRequestParams, IAddProductResponse } from 'common/types/requests/addProduct';

import { getDB } from 'server/db/getDB';
import { writeDB } from 'server/db/writeDB';

export default async function addProduct(
  req: Request<unknown, unknown, IAddProductRequestParams>,
  res: Response,
) {
  const { roomId, name } = req.body;

  const db = await getDB();

  const room = db.rooms.find((r) => r.id === roomId);

  if (!room) {
    throw new Error('Нет такой комнаты');
  }

  const newProduct: IProduct = {
    name,
    value: 0,
  };

  room.products.push(newProduct);

  await writeDB(db);

  const response: IAddProductResponse = {
    product: newProduct,
  };

  res.send(response);
}
