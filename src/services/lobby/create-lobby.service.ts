import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'

type IRequest = {
  gameId: string
  hostId: string
}

@injectable()
export class CreateLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,
  ) {}

  async execute({ gameId, hostId }: IRequest) {
    // Verificar se o host já possui um lobby ativo

    const joinCode = this.generateJoinCode()

    return this.lobbyRepository.create({
      gameId,
      hostId,
      isActive: true,
      joinCode,
    })
  }

  private generateJoinCode(): string {
    const codeLength = 6

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let joinCode = ''
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      joinCode += characters[randomIndex]
    }
    return joinCode
  }
}
