import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Match from './match.entity.js'
import Lobby from './lobby.entity.js'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  nickName: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // RELATIONS
  @OneToMany('Match', (match: Match) => match.winner)
  wonMatches: Match[]

  @OneToMany('Lobby', (lobby: Lobby) => lobby.host)
  lobbiesHost: Lobby[]

  @ManyToMany('Match', (match: Match) => match.players)
  matches: Match[]

  @ManyToMany('Lobby', (lobby: Lobby) => lobby.players)
  lobbies: Lobby[]
}
