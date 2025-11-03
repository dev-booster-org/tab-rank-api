import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateLobbyPlayersRelation1762213577777
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "lobby_players" (
                "lobby_id" UUID NOT NULL,
                "user_id" UUID NOT NULL,
                PRIMARY KEY ("lobby_id", "user_id"),
                CONSTRAINT "FK_lobby_players_lobby" FOREIGN KEY ("lobby_id") REFERENCES "lobby"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_lobby_players_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `)

    await queryRunner.query(`
            CREATE INDEX "IDX_lobby_players_lobby" ON "lobby_players" ("lobby_id")
        `)

    await queryRunner.query(`
            CREATE INDEX "IDX_lobby_players_user" ON "lobby_players" ("user_id")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_lobby_players_user"`)
    await queryRunner.query(`DROP INDEX "IDX_lobby_players_lobby"`)
    await queryRunner.query(`DROP TABLE "lobby_players"`)
  }
}
