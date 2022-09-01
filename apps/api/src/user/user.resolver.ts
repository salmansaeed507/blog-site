import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { LocalAuthGuard } from '../user/auth/auth.guard';
import { AuthService } from '../user/auth/auth.service';
import { Public } from '../user/auth/public.decorator';
import { SignupInput } from './dto/signup.input';
import { User } from './entities/user.entity';
import { SignupService } from './signup.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly signupService: SignupService,
    private readonly authService: AuthService,
  ) {}

  /**
   * login in use based on username/email and password
   * @param username
   * @param password
   * @returns JWT Token
   * @throws UnauthorizedException if login fails
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context('req') { user }: Request,
  ): Promise<string> {
    return this.authService.login(user as User);
  }

  /**
   * Creates new user
   * @param signupInput
   * @returns {User} created user
   * @throws BadRequestException if email already registered
   */
  @Public()
  @Mutation(() => User)
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<User> {
    return this.signupService.singup(signupInput);
  }
}
