import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRoleColumn1660740671195 implements MigrationInterface {
  name = 'userRoleColumn1660740671195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."app_users_role_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_users" ADD "role" "public"."app_users_role_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."app_users_role_enum"`);
  }
}
