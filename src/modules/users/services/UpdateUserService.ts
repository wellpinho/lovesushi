import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string
  name: string
  email: string
  password: string
}

class UpdateUserService {
  public async execute({id, name, email, password}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findOne(id)
    if (!user) {
      throw new AppError('user not found')
    }

    const userExists = await userRepository.findByName(name)
    if (userExists) {
      throw new AppError('There is already one user with this name')
    }

    user.name = name
    user.email = email
    user.password = password

    await userRepository.save(user)

    return user
  }
}

export default UpdateUserService
