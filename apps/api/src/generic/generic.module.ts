import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticSyncLog } from './entities/elastic-sync-log.entity';
import { GenericService } from './generic.service';
import { PaginationService } from './pagination/pagination.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ElasticSyncLog])],
  providers: [GenericService, PaginationService],
  exports: [GenericService, PaginationService],
})
export class GenericModule {}
