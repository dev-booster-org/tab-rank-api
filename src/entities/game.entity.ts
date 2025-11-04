import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import type { Match } from './match.entity.js'
import type { Lobby } from './lobby.entity.js'

export enum GameTypeEnum {
  STRATEGY = 'strategy',
  CARD = 'card',
  DICE = 'dice',
  PARTY = 'party',
  FAMILY = 'family',
  TRIVIA = 'trivia',
  COOPERATIVE = 'cooperative',
  COMPETITIVE = 'competitive',
  ABSTRACT = 'abstract',
  PUZZLE = 'puzzle',
  ADVENTURE = 'adventure',
  RPG = 'rpg',
  ECONOMY = 'economy',
  WARGAME = 'wargame',
  DEXTERITY = 'dexterity',
  SOCIAL_DEDUCTION = 'social_deduction',
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string

  @Column({ enum: GameTypeEnum, type: 'enum', array: true, nullable: false })
  type: GameTypeEnum[]

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl: string | null

  @Column({ type: 'int', nullable: false })
  minPlayers: number

  @Column({ type: 'int', nullable: false })
  maxPlayers: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // RELATIONS
  @OneToMany('Lobby', (lobby: Lobby) => lobby.game)
  lobbies: Lobby[]

  @OneToMany('Match', (match: Match) => match.game)
  matches: Match[]
}
