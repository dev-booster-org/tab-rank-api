import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateMatchPlayersRelation1762213599446
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "match_players" (
                "match_id" UUID NOT NULL,
                "user_id" UUID NOT NULL,
                PRIMARY KEY ("match_id", "user_id"),
                CONSTRAINT "FK_match_players_match" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_match_players_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `)

    await queryRunner.query(`
            CREATE INDEX "IDX_match_players_match" ON "match_players" ("match_id")
        `)

    await queryRunner.query(`
            CREATE INDEX "IDX_match_players_user" ON "match_players" ("user_id")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_match_players_user"`)
    await queryRunner.query(`DROP INDEX "IDX_match_players_match"`)
    await queryRunner.query(`DROP TABLE "match_players"`)
  }
}
