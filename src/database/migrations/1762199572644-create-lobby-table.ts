import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateLobbyTable1762199572644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "lobby" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "joinCode" VARCHAR UNIQUE,
                "isActive" BOOLEAN NOT NULL DEFAULT true,
                "host_id" UUID NOT NULL,
                "game_id" UUID NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_lobby_host" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_lobby_game" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lobby"`)
  }
}
