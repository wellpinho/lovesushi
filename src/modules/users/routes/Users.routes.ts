import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UsersController from '../controllers/UsersController'

const userRouter = Router()
const userController = new UsersController()

userRouter.get('/', userController.index)

userRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), userController.show)

userRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), userController.create)

userRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  }
}), userController.update)

userRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), userController.delete)

export default userRouter
