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

@Entity('app_replies')
@ObjectType()
export class Reply {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('text')
  @Field(() => String)
  comment: string;

  @Index()
  @Column('uuid')
  @Field(() => String)
  commentId: string;

  @Column('uuid')
  @Field(() => String)
  userId: string;

  @Field(() => User, { nullable: true })
  user: User | null;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
