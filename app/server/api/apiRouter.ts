import express from 'express';

import createRoom from 'server/api/handlers/room/createRoom';

const apiRouter = express.Router();

apiRouter
  .post('/room/create', createRoom);

export default apiRouter;
