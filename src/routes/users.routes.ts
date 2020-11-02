import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = (await createUser.execute({
    name,
    email,
    password,
  })) as Partial<User>;

  delete user.password;

  response.json(user);
});

export default usersRouter;
