import { Controller, Get } from '@nestjs/common';
import { Public } from './user/auth/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  index() {
    return 'Hello World';
  }

  @Public()
  @Get("hello")
  Hello() {
    console.log("Node envs: ", process.env["NODE_ENV"])
    return "node envs: " + process.env["NODE_ENV"];
  }
}
