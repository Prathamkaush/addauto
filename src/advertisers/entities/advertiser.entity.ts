import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advertiser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  contactEmail!: string;

  @Column({ nullable: true })
  websiteUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
