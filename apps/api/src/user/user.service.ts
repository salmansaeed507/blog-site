import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Finds single user by email
   * @param email
   * @returns User | null
   */
  async findOne(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  /**
   * Finds single user by UUID
   * @param userId
   * @returns User | null
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (user) {
      delete user.password;
    }
    return user;
  }

  /**
   * Batch function for DataLoader
   * @param userIds
   * @returns List of Users
   */
  async batchLoadFunc(userIds: Array<string>): Promise<Array<User | Error>> {
    const users: User[] = await this.userRepo.findBy({
      id: In(userIds),
    });
    return new Promise((resovle) => {
      const mappedResults = userIds.map(
        (userId) =>
          users.find((result) => result.id === userId) ||
          new Error(`Could not load user ${userId}`),
      );
      return resovle(mappedResults);
    });
  }
}
