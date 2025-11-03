import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateLobbyTable1762199572644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "lobby" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "joinCode" VARCHAR NOT NULL UNIQUE,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lobby"`)
  }
}
