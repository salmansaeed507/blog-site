import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignupService } from './signup.service';
import * as DataLoader from 'dataloader';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRY', '60m'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserResolver,
    UserService,
    SignupService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'UserLoader',
      useFactory: (userService: UserService) => {
        return new DataLoader<string, User>((keys: string[]) =>
          userService.batchLoadFunc(keys),
        );
      },
      inject: [UserService],
    },
  ],
  exports: [UserService, SignupService, 'UserLoader'],
})
export class UserModule {}
