import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  @Column({ nullable: false, unique: true })
  name: string

  @Column({ enum: GameTypeEnum, type: 'enum', array: true, nullable: false })
  type: GameTypeEnum[]

  @Column({ nullable: true })
  coverImageUrl: string | null

  @Column({ nullable: false })
  minPlayers: number

  @Column({ nullable: false })
  maxPlayers: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
