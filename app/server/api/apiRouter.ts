import express from 'express';
import bodyParser from 'body-parser';

import createRoom from 'server/api/handlers/room/createRoom';
import getRoom from 'server/api/handlers/room/getRoom';
import addProduct from 'server/api/handlers/room/addProduct';
import changeProducts from 'server/api/handlers/room/changeProducts';

const apiRouter = express.Router();

apiRouter
  .use(bodyParser.json())
  .get('/room', getRoom)
  .post('/room/create', createRoom)
  .post('/room/product/add', addProduct)
  .post('/room/products/change', changeProducts);

export default apiRouter;
