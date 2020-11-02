import { json, Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    response.json(user);
  } catch (err) {
    response.status(err.statusCode).json({ message: err.message });
  }
});

export default usersRouter;
