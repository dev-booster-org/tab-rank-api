import { Request, Response } from 'express'

import { CreateGameService } from '@services/game/create-game.service'

export class GameController {
  private readonly createGameService = new CreateGameService()

  async create(request: Request, response: Response) {
    const { name, type, maxPlayers, minPlayers, coverImageUrl } = request.body

    const game = await this.createGameService.execute({
      name,
      type,
      maxPlayers,
      minPlayers,
      coverImageUrl,
    })

    return response.status(201).json(game)
  }
}
