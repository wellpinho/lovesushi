import { Router } from 'express'
import productRouter from '@modules/products/routes/Products.routes'
import usersRouter from '@modules/users/routes/Users.routes'
import sessionRouter from '@modules/users/routes/SessionsRoutes'
import passwordRouter from '@modules/users/routes/Password.routes'
const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)

export default routes
