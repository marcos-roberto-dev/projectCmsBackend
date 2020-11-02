import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';
import sessionAuthenticated from '../middlewares/sessionAuthenticated';

const sessionsRouter = Router();

sessionsRouter.get('/', sessionAuthenticated, async (request, response) => {
  response.json({ user: request.user });
});

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const createSession = new CreateSessionService();

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  response.json({ user, token });
});

export default sessionsRouter;
