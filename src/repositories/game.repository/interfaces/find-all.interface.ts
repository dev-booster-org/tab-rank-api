import { Game, GameTypeEnum } from '@entities/game.entity'

export interface FindAllProps {
  search?: string
  type?: GameTypeEnum[]
}

export type FindAllResponse = Game[]
