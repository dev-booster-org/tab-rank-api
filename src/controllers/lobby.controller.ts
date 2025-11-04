import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateLobbyService } from '@services/lobby/create-lobby.service'
import { JoinLobbyService } from '@services/lobby/join-lobby.service'

export class LobbyController {
  async create(request: Request, response: Response) {
    const { gameId, hostId } = request.body

    const createLobbyService = container.resolve(CreateLobbyService)

    const lobby = await createLobbyService.execute({
      gameId,
      hostId,
    })

    return response.status(201).json(lobby)
  }

  async join(request: Request, response: Response) {
    const { lobbyId, userId } = request.body

    const joinLobbyService = container.resolve(JoinLobbyService)

    const lobby = await joinLobbyService.execute({
      lobbyId,
      userId,
    })

    return response.status(200).json(lobby)
  }
}
