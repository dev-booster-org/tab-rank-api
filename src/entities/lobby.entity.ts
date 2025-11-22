import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import User from './user.entity.js'
import Match from './match.entity.js'
import Game from './game.entity.js'

@Entity()
export default class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: true, unique: true })
  joinCode: string | null

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // RELATIONS
  @ManyToOne('User', { nullable: false })
  @JoinColumn({ name: 'host_id' })
  host: User

  @ManyToOne('Game', { nullable: false })
  @JoinColumn({ name: 'game_id' })
  game: Game

  @ManyToMany('User', (user: User) => user.lobbies)
  @JoinTable({
    name: 'lobby_players',
    joinColumn: { name: 'lobby_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  players: User[]

  @OneToMany('Match', (match: Match) => match.lobby)
  matches: Match[]
}
