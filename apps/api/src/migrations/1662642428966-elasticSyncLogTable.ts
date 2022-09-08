import { MigrationInterface, QueryRunner } from 'typeorm';

export class elasticSyncLogTable1662642428966 implements MigrationInterface {
  name = 'elasticSyncLogTable1662642428966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."elastic_sync_log_entitytype_enum" AS ENUM('blog')`
    );
    await queryRunner.query(
      `CREATE TABLE "elastic_sync_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityType" "public"."elastic_sync_log_entitytype_enum" NOT NULL, "entityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_559026d46c8a47ace1b57686d7c" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "elastic_sync_log"`);
    await queryRunner.query(
      `DROP TYPE "public"."elastic_sync_log_entitytype_enum"`
    );
  }
}
