import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reply } from './reply.entity';

@Entity('app_comments')
@Index(['blogId', 'createdAt'])
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('text')
  @Field(() => String)
  comment: string;

  @Column('uuid')
  @Field(() => String)
  blogId: string;

  @Column('uuid')
  @Field(() => String)
  userId: string;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [Reply])
  replies: Reply[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
