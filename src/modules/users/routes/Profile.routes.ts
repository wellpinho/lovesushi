import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

// Chama o middleware antes das rotas
profileRouter.use(isAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    // se password for inserido, então old_password sera requerido
    passwordConfirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required()
      })
  }
}), profileController.update)

export default profileRouter
