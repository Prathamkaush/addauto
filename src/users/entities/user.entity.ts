import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  role!: 'admin' | 'advertiser';

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
