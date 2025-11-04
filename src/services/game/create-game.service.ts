import { GameTypeEnum } from '@entities/game.entity'
import { GameRepository } from '@repositories/game.repository'

type IRequest = {
  name: string
  type: GameTypeEnum[]
  maxPlayers: number
  minPlayers: number
  coverImageUrl: string
}

export class CreateGameService {
  private readonly gameRepository = new GameRepository()

  async execute({
    maxPlayers,
    minPlayers,
    name,
    type,
    coverImageUrl,
  }: IRequest) {
    return this.gameRepository.create({
      maxPlayers,
      minPlayers,
      name,
      type,
      coverImageUrl,
    })
  }
}
