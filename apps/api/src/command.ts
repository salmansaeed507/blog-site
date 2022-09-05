import { NestFactory } from '@nestjs/core';
import { CommandService } from './command/command.service';
import { AppModule } from './app.module';

export async function RunCommands() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.get(CommandService).run();
  app.close();
}
