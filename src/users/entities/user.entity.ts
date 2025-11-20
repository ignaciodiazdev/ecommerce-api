import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 100})
  name: string;

  @Column({type: 'varchar', length: 255, unique: true})
  email: string;

  @Column({type: 'varchar', length: 100})
  password: string;

  @Column({type: 'varchar', length: 9, nullable: true})
  phone: string | null;

  @Column({type: 'varchar', length: 100, nullable: true})
  address: string | null;

  @Column({type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
