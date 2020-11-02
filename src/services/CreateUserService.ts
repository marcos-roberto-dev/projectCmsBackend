import { getRepository } from 'typeorm';

import User from '../models/User';

interface RequestTDO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestTDO): Promise<User> {
    const userRepository = getRepository(User);

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
