import { Router } from 'express'
import productRouter from '@modules/products/routes/Products.routes'
import usersRouter from '@modules/users/routes/Users.routes'
import sessionRouter from '@modules/users/routes/SessionsRoutes'
import passwordRouter from '@modules/users/routes/Password.routes'
import profileRouter from '@modules/users/routes/Profile.routes'
import customersRoutes from '@modules/customers/routes/Customers.routes'
const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRoutes)

export default routes
