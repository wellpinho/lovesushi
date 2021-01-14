import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ListOrderService from "../services/ListOrderServices";
import ShowOrderService from "../services/ShowOrderService";

export default class OrderController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listOrders = new ListOrderService()
    const order = await listOrders.execute()

    return res.json(order)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showOrder = new ShowOrderService()

    const order = await showOrder.execute({ id })

    return res.json(order)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body

    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({
      customer_id, products
    })

    return res.json(order)
  }

}
