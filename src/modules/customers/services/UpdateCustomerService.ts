import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string
  name: string
  email: string
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)
    if (!customer) {
      throw new AppError('Custom no tfound.')
    }

    const customerExists = await customersRepository.findByEmail(email)
    if (!customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.')
    }

    customer.name = name
    customer.email = email

    await customersRepository.save(customer)

    return customer
  }
}
