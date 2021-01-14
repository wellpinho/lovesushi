import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OrderController from '../controllers/OrderController'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'

const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.use(isAuthenticated)

orderRoutes.get('/', orderController.index)

orderRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), orderController.show)

orderRoutes.post('/', celebrate({
  [Segments.BODY]: {
    customer_id: Joi.string().uuid().required(),
    products: Joi.required()
  }
}), orderController.create)

export default orderRoutes
