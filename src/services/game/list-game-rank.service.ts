import { inject, injectable } from 'tsyringe'

import { GameRepository } from '@repositories/game.repository'

@injectable()
export class ListGameRankService {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository,
  ) {}

  async execute() {
    const gameRanks = await this.gameRepository.listGameRank()

    return gameRanks
  }
}
