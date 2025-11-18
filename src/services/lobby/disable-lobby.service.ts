import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'
import { AppError } from '@/shared/errors/app-error'

type IRequest = {
  id: string
  userId: string
}

@injectable()
export class JoinLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  async execute({ id, userId }: IRequest) {
    const lobby = await this.lobbyRepository.getById({ id })

    if (!lobby) {
      throw new AppError('Lobby não encontrado', 404)
    }

    if (lobby.host.id !== userId) {
      throw new AppError('Apenas o host pode desabilitar o lobby', 403)
    }

    return this.lobbyRepository.disable({ id: lobby.id })
  }
}
