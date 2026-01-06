import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => Number(value),
  }})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'bool'})
  isActive: boolean;

  @Column({type: 'uuid'})
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  @JoinColumn({name: "categoryId"})
  category: Category;
}
