import { Lobby } from '@entities/lobby.entity'

export interface JoinProps {
  lobbyId: string
  userId: string
}

export type JoinResponse = Lobby
