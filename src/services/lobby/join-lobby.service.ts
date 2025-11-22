import { inject, injectable } from 'tsyringe'

import { LobbyRepository } from '@repositories/lobby.repository'
import { AppError } from '@shared/errors/app-error'
import { getSocketIo } from '@shared/events/socket-io'
import User from '@/entities/user.entity'
import { GameRepository } from '@/repositories/game.repository'

type IRequest = {
  joinCode: string
  userId: string
}

@injectable()
export class JoinLobbyService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,

    @inject('GameRepository')
    private gameRepository: GameRepository,
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

    const formattedJoinCode = joinCode.trim().toUpperCase()

    const lobby = await this.lobbyRepository.getByJoinCode({
      joinCode: formattedJoinCode,
    })

    const game = await this.gameRepository.findById({ id: lobby.gameId })

    if (!game) {
      throw new AppError('Jogo do lobby não encontrado', 404)
    }

    if ([lobby.host, ...lobby.players].length >= game.maxPlayers) {
      throw new AppError('O lobby já atingiu o número máximo de jogadores', 403)
    }

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

    const userData = joinedLobby.players.find(
      (player: User) => player.id === userId,
    )

    this.socketIo.to(lobby.id).emit('lobby:player-joined', userData)

    return joinedLobby
  }
}
