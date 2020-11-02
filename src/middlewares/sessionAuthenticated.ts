import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import User from '../models/User';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function sessionAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const bearerToken = request.headers.authorization;
  const [, token] = bearerToken?.split(' ') as string[];
  const userRepository = getRepository(User);
  let decodedToken: TokenPayload;
  if (!token) throw new AppError('Token is missing.', 401);

  try {
    decodedToken = verify(token, authConfig.jwt.secret) as TokenPayload;
  } catch {
    throw new AppError('Invalid JWT Token.', 401);
  }

  const user = (await userRepository.findOne({
    where: { id: decodedToken.sub },
  })) as Partial<User>;

  if (!user) throw new AppError('This user not found.');

  delete user.password;

  request.user = user as User;

  return next();
}

export default sessionAuthenticated;
