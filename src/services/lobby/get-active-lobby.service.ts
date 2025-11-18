import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'

type IRequest = {
  userId: string
}

@injectable()
export class GetActiveLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  async execute({ userId }: IRequest) {
    const lobby = await this.lobbyRepository.getActiveLobbyByUserId({ userId })

    return lobby
  }
}
