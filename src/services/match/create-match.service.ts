import { inject, injectable } from 'tsyringe'

import { MatchRepository } from '@repositories/match.repository'
import { getSocketIo } from '@shared/events/socket-io'

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
    @inject('MatchRepository')
    private matchRepository: MatchRepository,
  ) {}

  private socketIo = getSocketIo()

  async execute({ duration, gameId, lobbyId, playerIds, winnerId }: IRequest) {
    const createdMatch = await this.matchRepository.create({
      duration,
      gameId,
      lobbyId,
      playerIds,
      winnerId: winnerId ?? null,
    })

    this.socketIo.to(lobbyId).emit('match:created', {
      match: createdMatch,
    })

    return createdMatch
  }
}
