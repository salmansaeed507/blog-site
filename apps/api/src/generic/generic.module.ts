import { Global, Module } from '@nestjs/common';
import { GenericService } from './generic.service';
import { PaginationService } from './pagination/pagination.service';

@Global()
@Module({
  providers: [GenericService, PaginationService],
  exports: [GenericService, PaginationService],
})
export class GenericModule {}
