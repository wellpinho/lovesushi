import { Router } from 'express'
import productRouter from '@modules/products/routes/Products.routes'
import usersRouter from '@modules/users/routes/Users.routes'
const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)

export default routes
