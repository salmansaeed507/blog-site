import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { SignupInput } from './dto/signup.input';
import { User } from './entities/user.entity';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Creates new user
   * @param signupInput {email: string, password: string}
   * @returns created user
   * @throws BadRequestException if email already registered
   */
  async singup(signupInput: SignupInput): Promise<User> {
    if (await this.isEmailInUse(signupInput.email)) {
      throw new BadRequestException('Email already in use');
    }
    signupInput.password = await hash(
      signupInput.password,
      '$2b$10$xb2CiF0TjZGbQpdg.M.EOO',
    );
    return this.userRepo.save(signupInput);
  }

  /**
   * Checks if email is already in use
   * @param email
   * @returns boolean
   */
  async isEmailInUse(email: string): Promise<boolean> {
    const userCount: number = await this.userRepo.countBy({ email });
    return userCount > 0;
  }
}
