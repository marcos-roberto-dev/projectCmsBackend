import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface RequestTDO {
  email: string;
  password: string;
}

interface ResponseTDO {
  user: Partial<User>;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestTDO): Promise<ResponseTDO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new AppError('This email/password is wrong.');

    const isPasswordValid = await compare(password, user.password as string);

    if (!isPasswordValid) throw new AppError('This email/password is wrong.');

    const token = sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
      subject: user.id,
    });

    return { user, token };
  }
}

export default CreateSessionService;
