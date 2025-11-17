import { Lobby } from '@/entities/lobby.entity'

export interface GetLobbyByJoinCodeProps {
  joinCode: string
}

export type GetLobbyByJoinCodeResponse = Lobby | null
