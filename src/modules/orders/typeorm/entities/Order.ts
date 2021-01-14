import customer from "@modules/customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  //many orders for one customer
  @ManyToOne(() => customer)
  @JoinColumn({ name: 'customer_id' })
  customer: customer

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
