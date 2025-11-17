import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/app-error'

import { LobbyRepository } from '@repositories/lobby.repository'

type IRequest = {
  id: string
}

@injectable()
export class GetLobbyByIdService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  async execute({ id }: IRequest) {
    const lobby = await this.lobbyRepository.getById({ id })

    if (!lobby) {
      throw new AppError('Lobby not found', 404)
    }

    return lobby
  }
}
