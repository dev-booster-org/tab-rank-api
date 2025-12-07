import { inject, injectable } from 'tsyringe'

import { GameRepository } from '@repositories/game.repository'

type IRequest = {
  userId: string
}

@injectable()
export class ListGameRankByUserService {
  constructor(
    @inject('GameRepository')
    private gameRepository: GameRepository,
  ) {}

  async execute({ userId }: IRequest) {
    console.log({ userId })
  }
}
