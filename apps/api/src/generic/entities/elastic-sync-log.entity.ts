import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ElasticSyncEntity {
  blog = 'blog',
}

@Entity()
export class ElasticSyncLog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('enum', { enum: ElasticSyncEntity })
  entityType: ElasticSyncEntity;

  @Column('uuid')
  entityId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
