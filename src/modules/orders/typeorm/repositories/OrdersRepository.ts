import customer from '@modules/customers/typeorm/entities/Customer'
import { EntityRepository, Repository } from 'typeorm'
import Order from '../entities/Order'

interface IProduct {
  product_id: string
  price: number
  quantity: number
}

interface IRequest {
  customer: customer
  products: IProduct[]
}

@EntityRepository(Order)
export class ProductRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer']
    })

    return order
  }

  public async creatOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer, order_products: products
    })

    await this.save(order)

    return order
  }
}
