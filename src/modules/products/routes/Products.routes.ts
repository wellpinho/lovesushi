import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import ProductsController from './../controllers/ProductsController'
import { join } from 'path'

const productRouter = Router()
const productsController = new ProductsController()

productRouter.get('/', productsController.index)

productRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), productsController.show)

productRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required()
  }
}), productsController.create)

productRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required()
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), productsController.update)

productRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), productsController.delete)

export default productRouter
