import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateGameTable1762199566373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "game_type_enum" AS ENUM (
                'strategy',
                'card',
                'dice',
                'party',
                'family',
                'trivia',
                'cooperative',
                'competitive',
                'abstract',
                'puzzle',
                'adventure',
                'rpg',
                'economy',
                'wargame',
                'dexterity',
                'social_deduction'
            )
        `)

    await queryRunner.query(`
            CREATE TABLE "game" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR NOT NULL UNIQUE,
                "type" game_type_enum[] NOT NULL,
                "coverImageUrl" VARCHAR,
                "minPlayers" INTEGER NOT NULL,
                "maxPlayers" INTEGER NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "game"`)
    await queryRunner.query(`DROP TYPE "game_type_enum"`)
  }
}
