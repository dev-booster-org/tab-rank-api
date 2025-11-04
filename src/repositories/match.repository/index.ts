import { Repository } from 'typeorm'

import { Match } from '@entities/match.entity'
import AppDataSource from '@database/typeorm-datasource'

import { CreateProps, CreateResponse } from './interfaces'

export class MatchRepository {
  private readonly matchRepository: Repository<Match> =
    AppDataSource.getRepository(Match)

  async create({
    duration,
    gameId,
    lobbyId,
    playerIds,
    winnerId,
  }: CreateProps): Promise<CreateResponse> {
    const createdMatch = this.matchRepository.create({
      duration,
      game: { id: gameId },
      lobby: { id: lobbyId },
      players: playerIds.map((id) => ({ id })),
      winner: winnerId ? { id: winnerId } : null,
    })

    await this.matchRepository.save(createdMatch)

    return createdMatch
  }
}
