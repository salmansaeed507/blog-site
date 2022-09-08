import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import {
  ElasticSyncLog,
  ElasticSyncEntity,
} from './entities/elastic-sync-log.entity';

@Injectable()
export class GenericService {
  constructor(
    @InjectRepository(ElasticSyncLog)
    private readonly elasticSyncLogRepo: Repository<ElasticSyncLog>,
    private readonly dataSource: DataSource
  ) {}

  /**
   * Updates an entity
   * @param entity EntityTarget<Entity>
   * @param entityId string
   * @param data InputType
   * @returns Promise<boolean>
   */
  async update<T>(
    entity: EntityTarget<T>,
    entityId: string,
    data: any
  ): Promise<boolean> {
    const { affected } = await this.dataSource
      .createQueryBuilder()
      .update(entity)
      .set(data)
      .where('id = :id', { id: entityId })
      .execute();
    return affected > 0;
  }

  /**
   * Fetches single record by id
   * @param entity EntityTarget<Entity>
   * @param entityId string
   * @returns Promise<Entity>
   */
  async findOne<T>(entity: EntityTarget<T>, entityId: string): Promise<T> {
    return this.dataSource
      .createQueryBuilder()
      .select('t')
      .from(entity, 't')
      .where({ id: entityId })
      .getOne();
  }

  /**
   * Checks if record exists or not
   * @param entity EntityTarget<Entity>
   * @param entityId string
   * @returns Promise<boolean>
   */
  async exists<T>(entity: EntityTarget<T>, entityId: string): Promise<boolean> {
    const nRow = await this.dataSource
      .createQueryBuilder()
      .from(entity, 't')
      .where('t.id = :id', { id: entityId })
      .getCount();
    return nRow > 0;
  }

  /**
   * creates a log entry to keep record that an entity e.g blog is synced on elastic search index
   * @param entityType
   * @param entityId
   * @returns Promise<boolean>
   */
  async createElasticSyncLog(
    entityType: ElasticSyncEntity,
    entityId: string
  ): Promise<boolean> {
    const result = await this.elasticSyncLogRepo.save({
      entityType,
      entityId,
    });
    return result ? true : false;
  }

  /**
   * Deletes elastic sync log entry
   * @param entityType
   * @param entityId
   * @returns Promise<boolean>
   */
  async deleteElasticSyncLog(
    entityType: ElasticSyncEntity,
    entityId: string
  ): Promise<boolean> {
    const { affected } = await this.elasticSyncLogRepo.delete({
      entityType,
      entityId,
    });
    return affected > 0;
  }
}
