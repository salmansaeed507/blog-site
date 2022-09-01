import { MigrationInterface, QueryRunner } from "typeorm";

export class blogTableUpdated1660910282312 implements MigrationInterface {
    name = 'blogTableUpdated1660910282312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_blogs" ADD "title" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "app_blogs" ADD "description" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "app_blogs" ADD "shortDescription" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "app_blogs" ADD "image" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "app_blogs" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_blogs" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_blogs" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "app_blogs" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "app_blogs" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "app_blogs" DROP COLUMN "title"`);
    }

}
