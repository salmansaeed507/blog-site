import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/auth/jwt.guard';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../datasourceoptions';
import { UserModule } from './user/user.module';
import { RolesGuard } from './user/roles.guard';
import { FileUploadModule } from './file-upload/file-upload.module';
import { GenericModule } from './generic/generic.module';
import { AppController } from './app.controller';
import { CommandModule } from './command/command.module';

const { entities, migrations, ...options } = dataSourceOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      ...options,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/galschema.gql',
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BlogModule,
    CommentModule,
    FileUploadModule,
    GenericModule,
    CommandModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
