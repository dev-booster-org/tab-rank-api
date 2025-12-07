/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm'

import AppDataSource from '@database/typeorm-datasource'
import Game from '@entities/game.entity'

import {
  CreateProps,
  CreateResponse,
  FindAllProps,
  FindAllResponse,
  FindByIdProps,
  FindByIdResponse,
  ListGameRankByUserProps,
  ListGameRankByUserResponse,
  ListGameRankResponse,
} from './interfaces'

export class GameRepository {
  private readonly gameRepository: Repository<Game> =
    AppDataSource.getRepository(Game)

  async create({
    name,
    type,
    maxPlayers,
    minPlayers,
    coverImageUrl,
  }: CreateProps): Promise<CreateResponse> {
    const game = this.gameRepository.create({
      name,
      type,
      maxPlayers,
      minPlayers,
      coverImageUrl,
    })

    const createdGame = await this.gameRepository.save(game)

    return createdGame
  }

  async findAll({ search, type }: FindAllProps): Promise<FindAllResponse> {
    const queryBuilder = this.gameRepository.createQueryBuilder('game')

    if (search) {
      queryBuilder.andWhere('game.name ILIKE :search', {
        search: `%${search}%`,
      })
    }

    if (type && type.length > 0) {
      queryBuilder.andWhere(':type && game.type', { type })
    }

    const games = await queryBuilder.getMany()

    return games
  }

  async listGameRank(): Promise<ListGameRankResponse[]> {
    const results = await this.gameRepository
      .createQueryBuilder('game')
      .leftJoin('game.matches', 'match')
      .leftJoin('match.winner', 'winner')
      .select('game.id', 'gameId')
      .addSelect('game.name', 'gameName')
      .addSelect('winner.id', 'winnerId')
      .addSelect('winner.nickName', 'winnerNickName')
      .addSelect('COUNT(match.id)', 'victoriesCount')
      .where('match.winner IS NOT NULL')
      .groupBy('game.id')
      .addGroupBy('game.name')
      .addGroupBy('winner.id')
      .addGroupBy('winner.nickName')
      .getRawMany()

    const gameRankMap = new Map<
      string,
      {
        id: string
        name: string
        winner: { id: string; nickName: string; victoriesCount: number }
      }
    >()

    for (const row of results) {
      const gameId = row.gameId
      const victoriesCount = parseInt(row.victoriesCount, 10)

      if (
        !gameRankMap.has(gameId) ||
        victoriesCount > gameRankMap.get(gameId)!.winner.victoriesCount
      ) {
        gameRankMap.set(gameId, {
          id: gameId,
          name: row.gameName,
          winner: {
            id: row.winnerId,
            nickName: row.winnerNickName,
            victoriesCount,
          },
        })
      }
    }

    return Array.from(gameRankMap.values())
  }

  async listGameRankByUser({
    userId,
  }: ListGameRankByUserProps): Promise<ListGameRankByUserResponse[]> {
    throw new Error('Method not implemented.')
  }

  async findById({ id }: FindByIdProps): Promise<FindByIdResponse> {
    const game = await this.gameRepository.findOneBy({ id })

    return game
  }
}
