import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'

type IRequest = {
  lobbyId: string
  userId: string
}

@injectable()
export class JoinLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  async execute({ lobbyId, userId }: IRequest) {
    return this.lobbyRepository.join({ lobbyId, userId })
  }
}
