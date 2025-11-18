import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'

import { AppError } from '@/shared/errors/app-error'

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
    const userIsInActiveLobby =
      await this.lobbyRepository.getActiveLobbyByUserId({
        userId: hostId,
      })

    if (userIsInActiveLobby) {
      throw new AppError('Você já está em um lobby ativo', 403)
    }

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

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let joinCode = ''
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      joinCode += characters[randomIndex]
    }
    return joinCode
  }
}
