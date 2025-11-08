import { inject, injectable } from 'tsyringe'

import { MatchRepository } from '@repositories/match.repository'

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

  async execute({ duration, gameId, lobbyId, playerIds, winnerId }: IRequest) {
    const createdMatch = await this.matchRepository.create({
      duration,
      gameId,
      lobbyId,
      playerIds,
      winnerId: winnerId ?? null,
    })

    return createdMatch
  }
}
