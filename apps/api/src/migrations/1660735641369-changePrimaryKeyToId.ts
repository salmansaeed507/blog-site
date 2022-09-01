import { MigrationInterface, QueryRunner } from 'typeorm';

export class changePrimaryKeyToId1660735641369 implements MigrationInterface {
  name = 'changePrimaryKeyToId1660735641369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_users" RENAME COLUMN "userId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_users" RENAME CONSTRAINT "PK_3fd9de5aab25b01de2eefeead3c" TO "PK_9b97e4fbff9c2f3918fda27f999"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_comments" RENAME COLUMN "commentId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_comments" RENAME CONSTRAINT "PK_0fd34660eabff841717246c9a0f" TO "PK_09973294053279027858171868d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_blogs" RENAME COLUMN "blogId" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_blogs" RENAME CONSTRAINT "PK_900d831fe7f478a714719f2cf7f" TO "PK_1168f3bf355f5270a93ad8b0c1b"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_blogs" RENAME CONSTRAINT "PK_1168f3bf355f5270a93ad8b0c1b" TO "PK_900d831fe7f478a714719f2cf7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_blogs" RENAME COLUMN "id" TO "blogId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_comments" RENAME CONSTRAINT "PK_09973294053279027858171868d" TO "PK_0fd34660eabff841717246c9a0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_comments" RENAME COLUMN "id" TO "commentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_users" RENAME CONSTRAINT "PK_9b97e4fbff9c2f3918fda27f999" TO "PK_3fd9de5aab25b01de2eefeead3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_users" RENAME COLUMN "id" TO "userId"`,
    );
  }
}
