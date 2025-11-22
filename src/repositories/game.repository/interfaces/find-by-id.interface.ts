import Game from '@/entities/game.entity'

export interface FindByIdProps {
  id: string
}

export type FindByIdResponse = Game | null
