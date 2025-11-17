import { Lobby } from '@entities/lobby.entity'

export interface GetLobbyByIdProps {
  id: string
}

export type GetLobbyByIdResponse = Lobby | null
