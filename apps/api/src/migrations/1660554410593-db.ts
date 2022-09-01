import { MigrationInterface, QueryRunner } from "typeorm";

export class db1660554410593 implements MigrationInterface {
    name = 'db1660554410593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3fd9de5aab25b01de2eefeead3c" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "app_comments" ("commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "blogId" uuid NOT NULL, "userId" uuid NOT NULL, "parentCommentId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0fd34660eabff841717246c9a0f" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`CREATE TABLE "app_blogs" ("blogId" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_900d831fe7f478a714719f2cf7f" PRIMARY KEY ("blogId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app_blogs"`);
        await queryRunner.query(`DROP TABLE "app_comments"`);
        await queryRunner.query(`DROP TABLE "app_users"`);
    }

}
