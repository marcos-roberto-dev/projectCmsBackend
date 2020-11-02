import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestTDO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestTDO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ where: { email } });

    if (checkUserExist) throw new AppError('This email is already exist.');

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
