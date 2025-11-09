import { inject, injectable } from 'tsyringe'

import { GameRepository } from '@repositories/game.repository'
import { GameTypeEnum } from '@entities/game.entity'

type IRequest = {
  search?: string
  type?: GameTypeEnum[]
}

@injectable()
export class ListGamesService {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository,
  ) {}

  async execute({ search, type }: IRequest) {
    return this.gameRepository.findAll({
      ...(search && { search }),
      ...(type && { type }),
    })
  }
}
