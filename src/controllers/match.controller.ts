import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateMatchService } from '@services/match/create-match.service'

export class MatchController {
  async create(request: Request, response: Response) {
    const { duration, gameId, lobbyId, playerIds, winnerId } = request.body

    const createMatchService = container.resolve(CreateMatchService)

    const createdMatch = await createMatchService.execute({
      duration,
      gameId,
      lobbyId,
      playerIds,
      winnerId,
    })

    response.status(201).json(createdMatch)
  }
}
