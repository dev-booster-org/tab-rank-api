import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'
import { AppError } from '@shared/errors/app-error'
import { getSocketIo } from '@shared/events/socket-io'

type IRequest = {
  lobbyId: string
  userId: string
}

@injectable()
export class LeaveLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  private socketIo = getSocketIo()

  async execute({ userId, lobbyId }: IRequest) {
    const lobby = await this.lobbyRepository.getById({ id: lobbyId })

    if (!lobby) {
      throw new AppError('Lobby não encontrado', 404)
    }

    const thisUserIsAHost = lobby.host.id === userId

    if (thisUserIsAHost) {
      const leftLobby = await this.lobbyRepository.leaveLobbyAsHost({
        lobbyId,
        userId,
      })

      return leftLobby
    }

    const leftLobby = await this.lobbyRepository.leaveLobbyAsPlayer({
      lobbyId,
      userId,
    })

    this.socketIo.to(lobby.id).emit('lobby:player-left', {
      playerLeftId: userId,
      newHostId: leftLobby.host.id,
    })

    return leftLobby
  }
}
