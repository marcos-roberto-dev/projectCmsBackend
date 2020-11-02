import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const createSession = new CreateSessionService();

  const user = await createSession.execute({ email, password });
  response.json(user);
});

export default sessionsRouter;
