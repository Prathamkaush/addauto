import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  advertiserId!: string;

  @Column()
  previewUrl!: string;

  @Column()
  trackingUrl!: string;

  @Column()
  runFrequency!: string;

  @Column({ type: 'json', default: {} })
  parameters!: Record<string, string>;

  @CreateDateColumn()
  createdAt!: Date;
}
