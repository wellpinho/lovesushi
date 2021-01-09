import { Router } from 'express'
import productRouter from '@modules/products/routes/Products.routes'

const routes = Router()

routes.use('/products', productRouter)

export default routes
