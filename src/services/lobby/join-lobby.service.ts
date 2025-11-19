import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'
import { AppError } from '@shared/errors/app-error'
import { getSocketIo } from '@shared/events/socket-io'

type IRequest = {
  joinCode: string
  userId: string
}

@injectable()
export class JoinLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  private socketIo = getSocketIo()

  async execute({ joinCode, userId }: IRequest) {
    const userIsInActiveLobby =
      await this.lobbyRepository.getActiveLobbyByUserId({
        userId,
      })

    if (userIsInActiveLobby) {
      throw new AppError('Você já está em um lobby ativo', 403)
    }

    const lobby = await this.lobbyRepository.getByJoinCode({ joinCode })

    if (!lobby) {
      throw new AppError('Lobby não encontrado', 404)
    }

    if (!lobby.isActive) {
      throw new AppError('Este lobby não está mais ativo', 403)
    }

    const joinedLobby = await this.lobbyRepository.join({
      lobbyId: lobby.id,
      userId,
    })

    const userData = joinedLobby.players.find((player) => player.id === userId)

    this.socketIo.to(lobby.id).emit('lobby:player-joined', {
      userData,
    })

    return joinedLobby
  }
}
