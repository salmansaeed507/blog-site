import { Controller, Get } from '@nestjs/common';
import { Public } from './user/auth/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  index() {
    return 'Hello Worlds';
  }
}
