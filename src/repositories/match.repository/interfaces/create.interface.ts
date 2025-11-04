import { Match } from '@entities/match.entity'

export interface CreateProps {
  duration: number
  gameId: string
  lobbyId: string
  winnerId?: string | null
  playerIds: string[]
}

export type CreateResponse = Match
