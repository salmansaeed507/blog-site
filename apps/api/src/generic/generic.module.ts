import { Global, Module } from '@nestjs/common';
import { GenericService } from './generic.service';

@Global()
@Module({
  providers: [GenericService],
  exports: [GenericService],
})
export class GenericModule {}
