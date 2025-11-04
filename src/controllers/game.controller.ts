import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateGameService } from '@services/game/create-game.service'

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
}
