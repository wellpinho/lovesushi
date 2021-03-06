import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersController'
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated'
import UserAvatarController from '../controllers/UserAvatarController'

const userRouter = Router()
const userController = new UsersController()
const usersAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

userRouter.get('/', isAuthenticated, userController.index)

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

userRouter.patch('/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

userRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), userController.delete)

export default userRouter
