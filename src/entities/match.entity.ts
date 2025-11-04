import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import type { Game } from './game.entity.js'
import type { User } from './user.entity.js'
import type { Lobby } from './lobby.entity.js'

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'int', nullable: false })
  duration: number

  // RELATIONS
  @ManyToOne('Game', (game: Game) => game.matches, { nullable: false })
  @JoinColumn({ name: 'game_id' })
  game: Game

  @ManyToOne('User', { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner: User | null

  @ManyToOne('Lobby', (lobby: Lobby) => lobby.matches, { nullable: false })
  @JoinColumn({ name: 'lobby_id' })
  lobby: Lobby

  @ManyToMany('User', (user: User) => user.matches)
  @JoinTable({
    name: 'match_players',
    joinColumn: { name: 'match_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  players: User[]
}
