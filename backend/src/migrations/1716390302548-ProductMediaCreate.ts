import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductMediaCreate1716390302548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TYPE "public"."product_media_type_enum" AS ENUM('main', 'preview')`)
      await queryRunner.query(`CREATE TABLE "product_media" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "public"."product_media_type_enum" NOT NULL DEFAULT 'main', "file_key" character varying NOT NULL, "mime_type" character varying NOT NULL, "variant_id" character varying NOT NULL, CONSTRAINT "PK_09d4639de8082a32aa27f3ac9a6" PRIMARY KEY ("id"))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "product_media"`)
      await queryRunner.query(`DROP TYPE "public"."product_media_type_enum"`)
    }

}
