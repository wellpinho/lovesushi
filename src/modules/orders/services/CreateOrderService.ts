import customer from "@modules/customers/typeorm/entities/Customer";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProducts {
  id: string
  quantity: number
}

interface IRequest {
  customer_id: string
  products: IProducts[]
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository)
    const customerRepository = getCustomRepository(CustomersRepository)
    const productsRepository = getCustomRepository(ProductRepository)

    const customerExists = await customerRepository.findById(customer_id)

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.')
    }

    const existsProducts = await productsRepository.findAllByIds(products)

    if (!existsProducts) {
      throw new AppError('Could not find any products with the given ids.')
    }

    const existsProductsIds = existsProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find any products ${checkInexistentProducts[0].id}`)
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(prod => prod.id === product.id)[0].quantity < product.quantity
    )

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
    }

    const serializedProduxts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(prod => prod.id === product.id)[0].price
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProduxts
    })

    const { order_products } = order

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(prod => prod.id)[0].quantity - product.quantity
    }))

    await productsRepository.save(updatedProductQuantity)

    return order
  }
}

