import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialData1662638622948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.app_users
        (id, email, "password", "role", "createdAt", "updatedAt")
        VALUES('f81faeca-eb2e-474e-972b-aef9df9b672e'::uuid, 'salman@gmail.com', '$2b$10$xb2CiF0TjZGbQpdg.M.EOOakitxBoKrVlEzH1IUsO9qq6MitVxTyC', 'admin', '2022-09-08 17:03:02.818', '2022-09-08 17:03:02.818');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.app_users
    WHERE id='f81faeca-eb2e-474e-972b-aef9df9b672e'::uuid;
    `);
  }
}
