import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbSchema1662639578421 implements MigrationInterface {
  name = 'dbSchema1662639578421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."app_users_role_enum" AS ENUM('user', 'admin')`
    );
    await queryRunner.query(
      `CREATE TABLE "app_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "role" "public"."app_users_role_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9b97e4fbff9c2f3918fda27f999" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3bc5d83878db282dd77de09046" ON "app_users" ("email", "password") `
    );
    await queryRunner.query(
      `CREATE TABLE "app_replies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "commentId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96f4ee6bab3e6c92d6a30f9be71" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50ebdec4af528bd1337a512423" ON "app_replies" ("commentId") `
    );
    await queryRunner.query(
      `CREATE TABLE "app_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "blogId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09973294053279027858171868d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_168318b6ed7877dffa84b48aa8" ON "app_comments" ("blogId", "createdAt") `
    );
    await queryRunner.query(
      `CREATE TABLE "app_blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100), "description" character varying(500), "shortDescription" character varying(250), "content" text, "image" character varying(100), "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1168f3bf355f5270a93ad8b0c1b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "app_blogs"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_168318b6ed7877dffa84b48aa8"`
    );
    await queryRunner.query(`DROP TABLE "app_comments"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_50ebdec4af528bd1337a512423"`
    );
    await queryRunner.query(`DROP TABLE "app_replies"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3bc5d83878db282dd77de09046"`
    );
    await queryRunner.query(`DROP TABLE "app_users"`);
    await queryRunner.query(`DROP TYPE "public"."app_users_role_enum"`);
  }
}
