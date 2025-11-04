import { Lobby } from '@entities/lobby.entity'

export interface CreateProps {
  joinCode?: string | null
  isActive: boolean
  hostId: string
  gameId: string
}

export type CreateResponse = Lobby
