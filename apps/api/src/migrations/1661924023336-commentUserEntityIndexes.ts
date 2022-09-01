import { MigrationInterface, QueryRunner } from "typeorm";

export class commentUserEntityIndexes1661924023336 implements MigrationInterface {
    name = 'commentUserEntityIndexes1661924023336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3bc5d83878db282dd77de09046" ON "app_users" ("email", "password") `);
        await queryRunner.query(`CREATE INDEX "IDX_168318b6ed7877dffa84b48aa8" ON "app_comments" ("blogId", "createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_168318b6ed7877dffa84b48aa8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc5d83878db282dd77de09046"`);
    }

}
