import { Game, GameTypeEnum } from '@entities/game.entity'

export interface CreateProps {
  name: string
  type: GameTypeEnum[]
  coverImageUrl?: string
  minPlayers: number
  maxPlayers: number
}

export type CreateResponse = Game
