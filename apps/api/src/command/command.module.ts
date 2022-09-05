import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { CommandService } from './command.service';

@Module({
  imports: [BlogModule],
  providers: [CommandService],
})
export class CommandModule {}
