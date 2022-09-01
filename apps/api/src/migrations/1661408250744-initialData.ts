import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialData1661408250744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.app_users
    ("id", email, "password", "createdAt", "updatedAt", "role")
    VALUES('a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, 'salman@gmail.com', '$2b$10$xb2CiF0TjZGbQpdg.M.EOOakitxBoKrVlEzH1IUsO9qq6MitVxTyC', '2022-08-15 14:07:54.803', '2022-08-15 14:07:54.803','admin');
    INSERT INTO public.app_users
    ("id", email, "password", "createdAt", "updatedAt", "role")
    VALUES('be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, 'arfan@abc.com', '$2b$10$xb2CiF0TjZGbQpdg.M.EOOakitxBoKrVlEzH1IUsO9qq6MitVxTyC', '2022-08-16 18:36:18.043', '2022-08-16 18:36:18.043', 'admin');

    `);

    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versi', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 11:56:22.341', '2022-08-16 11:56:22.341');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('bdb6949e-5019-481f-8ceb-4eda9a06777e'::uuid, 'Blog content', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 15:05:26.823', '2022-08-16 15:05:26.823');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('ae0ad425-f14f-4c97-a9b3-abf33fd8e3c8'::uuid, 'Blog content', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 15:05:38.798', '2022-08-16 15:05:38.798');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('71cc30ac-1a33-42de-88f9-94ad0f5ee0ca'::uuid, 'Blog content', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 15:05:39.987', '2022-08-16 15:05:39.987');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('f11e3215-db72-46b4-aa74-bfe67bacff94'::uuid, 'Blog content', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 15:05:40.843', '2022-08-16 15:05:40.843');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('993d11c5-33a5-4361-a142-d14943b14a5a'::uuid, 'Blog content updated', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 11:01:12.515', '2022-08-16 15:07:49.380');
    // INSERT INTO public.app_blogs
    // ("blogId", "content", "userId", "createdAt", "updatedAt")
    // VALUES('aae38847-c84c-4105-bffa-9977a9e85f81'::uuid, 'Blog content', 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, '2022-08-16 15:33:33.197', '2022-08-16 15:33:33.197');

    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('cf98a340-0a5f-4f2c-b1fe-53c4b0843200'::uuid, 'Can you please elaborate!', '993d11c5-33a5-4361-a142-d14943b14a5a'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, NULL, '2022-08-16 18:39:26.926', '2022-08-16 18:39:26.926');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('a67cbf4b-454f-4cc4-bbe6-98b821255b2a'::uuid, 'Can you please elaborate!', 'f11e3215-db72-46b4-aa74-bfe67bacff94'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, NULL, '2022-08-16 18:39:30.437', '2022-08-16 18:39:30.437');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('b87d6c9a-bc92-4d3e-8aea-97bcaf37a640'::uuid, 'Can you please elaborate!', '71cc30ac-1a33-42de-88f9-94ad0f5ee0ca'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, NULL, '2022-08-16 18:39:34.509', '2022-08-16 18:39:34.509');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('94452b0e-05e6-4e30-92d6-1acade21d18e'::uuid, 'You are made!', '6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, 'cc830603-1173-4052-b4ad-3b035d170b88'::uuid, '2022-08-16 18:37:33.333', '2022-08-16 18:37:33.333');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('f31a21fa-f34b-4c22-b3c4-bf389ec334c7'::uuid, 'Can you please explain what is going on?', '6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, NULL, '2022-08-16 18:35:14.854', '2022-08-16 18:35:14.854');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('ef2ad9d7-c6dc-48c7-ac91-8463434780b3'::uuid, 'Bro, I don''t know what is so confusing in this content that you are not able to understand!', '6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, 'f31a21fa-f34b-4c22-b3c4-bf389ec334c7'::uuid, '2022-08-16 18:35:48.880', '2022-08-16 18:35:48.880');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('cc830603-1173-4052-b4ad-3b035d170b88'::uuid, 'He is mad i guess', '6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, 'f31a21fa-f34b-4c22-b3c4-bf389ec334c7'::uuid, '2022-08-16 18:36:52.395', '2022-08-16 18:36:52.395');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('c9c39e9f-cc48-4f1e-9a3f-1f5fd0e6afa5'::uuid, 'Thanks bro', '6053ac5f-dcaf-4e6b-ab21-702231b972b6'::uuid, 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, 'ef2ad9d7-c6dc-48c7-ac91-8463434780b3'::uuid, '2022-08-16 18:37:24.754', '2022-08-16 18:37:24.754');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('13fd3798-d37f-49af-b959-e036b1294cdf'::uuid, 'Wow! What a great content bro, but don''t you think it''s too lengthy', 'bdb6949e-5019-481f-8ceb-4eda9a06777e'::uuid, 'a164dd08-bb24-4f8b-aacb-81a269baf928'::uuid, NULL, '2022-08-16 18:38:12.327', '2022-08-16 18:38:12.327');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('46165758-4e6f-41e2-9e8c-d5f5b64e4902'::uuid, 'Hahaahahah...', 'bdb6949e-5019-481f-8ceb-4eda9a06777e'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, '13fd3798-d37f-49af-b959-e036b1294cdf'::uuid, '2022-08-16 18:38:33.537', '2022-08-16 18:38:33.537');
    // INSERT INTO public.app_comments
    // ("commentId", "comment", "blogId", "userId", "parentCommentId", "createdAt", "updatedAt")
    // VALUES('1b9920df-3a9f-4a06-951f-2798b0eea360'::uuid, 'Can you please elaborate!', 'ae0ad425-f14f-4c97-a9b3-abf33fd8e3c8'::uuid, 'be503398-c579-4c1d-b4c6-7e722c8eeac7'::uuid, NULL, '2022-08-16 18:39:19.748', '2022-08-16 18:39:19.748');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.app_users`);
    await queryRunner.query(`DELETE FROM public.app_blogs`);
    await queryRunner.query(`DELETE FROM public.app_comments`);
  }
}
