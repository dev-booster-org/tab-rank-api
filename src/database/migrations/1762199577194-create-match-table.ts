import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMatchTable1762199577194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "match" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "duration" INTEGER NOT NULL,
                "game_id" UUID NOT NULL,
                "winner_id" UUID,
                "lobby_id" UUID NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_match_game" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_match_winner" FOREIGN KEY ("winner_id") REFERENCES "user"("id") ON DELETE SET NULL,
                CONSTRAINT "FK_match_lobby" FOREIGN KEY ("lobby_id") REFERENCES "lobby"("id") ON DELETE RESTRICT
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "match"`)
  }
}
