import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('app_blogs')
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  @Field(() => String)
  title: string;

  @Column('varchar', { length: 500, nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column('varchar', { length: 250, nullable: true })
  @Field(() => String, { nullable: true })
  shortDescription?: string;

  @Column('text', { nullable: true })
  @Field(() => String, { nullable: true })
  content?: string;

  @Column('varchar', { length: 100, nullable: true })
  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Column('uuid')
  @Field(() => String)
  userId: string;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [Comment])
  comments: Comment[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
