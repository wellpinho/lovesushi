import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import customer from "@modules/customers/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  //many orders for one customer
  @ManyToOne(() => customer)
  @JoinColumn({ name: 'customer_id' })
  customer: customer

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true
  })
  order_products: OrdersProducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
