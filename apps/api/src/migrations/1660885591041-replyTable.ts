import { MigrationInterface, QueryRunner } from "typeorm";

export class replyTable1660885591041 implements MigrationInterface {
    name = 'replyTable1660885591041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_replies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "commentId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96f4ee6bab3e6c92d6a30f9be71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "app_comments" DROP COLUMN "parentCommentId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_comments" ADD "parentCommentId" uuid`);
        await queryRunner.query(`DROP TABLE "app_replies"`);
    }

}
