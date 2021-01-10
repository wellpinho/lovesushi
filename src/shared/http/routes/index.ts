import { Router } from 'express'
import productRouter from '@modules/products/routes/Products.routes'
import usersRouter from '@modules/users/routes/Users.routes'
import sessionRouter from '@modules/users/routes/SessionsRoutes'
const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)

export default routes
