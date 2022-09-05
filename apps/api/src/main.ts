import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
import { RunCommands } from './command';

async function bootstrap() {
  const argv = process.argv;
  if (argv.includes('command')) {
    await RunCommands();
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(
      '/',
      express.static(join(__dirname, '../../../dist/apps/frontend'))
    );
    app.use('/public', express.static('./uploads'));
    app.listen(parseInt(process.env.PORT) || 3000);
  }
}
bootstrap();
