import { Lobby } from '@/entities/lobby.entity'

export interface LeaveLobbyProps {
  userId: string
  lobbyId: string
}

export type LeaveLobbyResponse = Lobby
