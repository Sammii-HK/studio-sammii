import { MigrationInterface, QueryRunner } from "typeorm";

export class VariantMediaCreate1716449025193 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "variant_media" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "file_key" character varying NOT NULL, "mime_type" character varying NOT NULL, "variant_id" character varying NOT NULL, CONSTRAINT "PK_05a4239de8082a32aa27f3hs52s" PRIMARY KEY ("id"))`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "variant_media"`)
  }

}
