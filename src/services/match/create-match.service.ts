import { inject, injectable } from 'tsyringe'

import { MatchRepository } from '@repositories/match.repository'
import { getSocketIo } from '@shared/events/socket-io'
import { LobbyRepository } from '@/repositories/lobby.repository'
import { AppError } from '@/shared/errors/app-error'
import { GameRepository } from '@/repositories/game.repository'

type IRequest = {
  duration: number
  gameId: string
  lobbyId: string
  winnerId?: string | null
  playerIds: string[]
}

@injectable()
export class CreateMatchService {
  constructor(
    @inject('LobbyRepository')
    private lobbyRepository: LobbyRepository,

    @inject('MatchRepository')
    private matchRepository: MatchRepository,

    @inject('GameRepository')
    private gameRepository: GameRepository,
  ) {}

  private socketIo = getSocketIo()

  async execute({ duration, gameId, lobbyId, playerIds, winnerId }: IRequest) {
    const [lobby, game] = await Promise.all([
      this.lobbyRepository.getById({ id: lobbyId }),
      this.gameRepository.findById({ id: gameId }),
    ])

    if (!lobby) {
      throw new AppError('Lobby não encontrado', 404)
    }

    if (!game) {
      throw new AppError('Jogo não encontrado', 404)
    }

    if (!lobby.isActive) {
      throw new AppError(
        'Não é possível criar uma partida em um lobby inativo',
        403,
      )
    }

    const totalPlayers = [lobby.host, ...lobby.players].length

    if (totalPlayers < game.minPlayers) {
      throw new AppError(
        `Número mínimo de jogadores para este jogo é ${game.minPlayers}`,
        403,
      )
    }

    if (totalPlayers > game.maxPlayers) {
      throw new AppError(
        `Número máximo de jogadores para este jogo é ${game.maxPlayers}`,
        403,
      )
    }

    const createdMatch = await this.matchRepository.create({
      duration,
      gameId,
      lobbyId,
      playerIds,
      winnerId: winnerId ?? null,
    })

    this.socketIo.to(lobbyId).emit('match:created', createdMatch)

    return createdMatch
  }
}
