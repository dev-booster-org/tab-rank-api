/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm'

import AppDataSource from '@database/typeorm-datasource'
import { Game } from '@entities/game.entity'

import {
  CreateProps,
  CreateResponse,
  FindAllProps,
  FindAllResponse,
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
}
