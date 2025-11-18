import { Lobby } from '@/entities/lobby.entity'

export interface GetActiveLobbyByUserIdProps {
  userId: string
}

export type GetActiveLobbyByUserResponse = Lobby | null
