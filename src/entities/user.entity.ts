import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Match } from './match.entity'
import { Lobby } from './lobby.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  nickName: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // RELATIONS
  @OneToMany(() => Match, (match) => match.winner)
  wonMatches: Match[]

  @OneToMany(() => Lobby, (lobby) => lobby.host)
  lobbiesHost: Lobby[]

  @ManyToMany(() => Match, (match) => match.players)
  matches: Match[]

  @ManyToMany(() => Lobby, (lobby) => lobby.players)
  lobbies: Lobby[]
}
