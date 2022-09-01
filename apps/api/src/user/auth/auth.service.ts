import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param username
   * @param password
   * @returns authenticated user
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user: User = await this.userService.findOne(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   *
   * @param user
   * @returns JWT Token
   */
  login({ id, email, role }: User): string {
    const payload = { id, email, role, userId: id };
    return this.jwtService.sign(payload);
  }
}
