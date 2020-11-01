import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request, response) => response.send('ok'));

export default usersRouter;
