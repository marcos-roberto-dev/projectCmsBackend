import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestTDO {
  email: string;
  password: string;
}

interface ResponseTDO {
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: RequestTDO): Promise<ResponseTDO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new AppError('This email/password is wrong.');

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) throw new AppError('This email/password is wrong.');

    return { user };
  }
}

export default CreateSessionService;
