import { Repository } from 'typeorm'

import Match from '@entities/match.entity'
import AppDataSource from '@database/typeorm-datasource'

import {
  CreateProps,
  CreateResponse,
  GetByUserIdProps,
  GetByUserIdResponse,
} from './interfaces'

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

  async getByUserId({
    userId,
    page = 1,
    limit = 10,
  }: GetByUserIdProps): Promise<GetByUserIdResponse> {
    const [matches, totalCount] = await this.matchRepository
      .createQueryBuilder('match')
      .innerJoin('match.players', 'player', 'player.id = :userId', { userId })
      .leftJoinAndSelect('match.game', 'game')
      .leftJoinAndSelect('match.lobby', 'lobby')
      .leftJoinAndSelect('match.winner', 'winner')
      .orderBy('match.createdAt', 'DESC')
      .skip(page && limit ? (page - 1) * limit : 0)
      .take(limit || 10)
      .getManyAndCount()

    return {
      totalCount,
      matches,
    }
  }
}
