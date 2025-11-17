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
    const lobby = await this.lobbyRepository.getByJoinCode({ joinCode })

    if (!lobby) {
      throw new AppError('Lobby não encontrado', 404)
    }

    return this.lobbyRepository.join({ lobbyId: lobby.id, userId })
  }
}
