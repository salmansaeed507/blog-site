import { MigrationInterface, QueryRunner } from "typeorm";

export class rolesIndex1661925126538 implements MigrationInterface {
    name = 'rolesIndex1661925126538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_50ebdec4af528bd1337a512423" ON "app_replies" ("commentId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_50ebdec4af528bd1337a512423"`);
    }

}
