import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'
import { AppError } from '@/shared/errors/app-error'

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

    return this.lobbyRepository.join({ lobbyId: lobby.id, userId })
  }
}
