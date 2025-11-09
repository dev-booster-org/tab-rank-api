import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateGameService } from '@services/game/create-game.service'
import { ListGamesService } from '@services/game/list-games.service'
import { type GameTypeEnum } from '@entities/game.entity'

export class GameController {
  async create(request: Request, response: Response) {
    const { name, type, maxPlayers, minPlayers, coverImageUrl } = request.body

    const createGameService = container.resolve(CreateGameService)

    const game = await createGameService.execute({
      name,
      type,
      maxPlayers,
      minPlayers,
      coverImageUrl,
    })

    return response.status(201).json(game)
  }

  async list(request: Request, response: Response) {
    const { search, type } = request.query

    const listGamesService = container.resolve(ListGamesService)

    const games = await listGamesService.execute({
      search: search as string | undefined,
      type: type as GameTypeEnum[] | undefined,
    })

    return response.status(200).json(games)
  }
}
