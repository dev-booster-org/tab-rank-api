import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateLobbyService } from '@services/lobby/create-lobby.service'
import { JoinLobbyService } from '@services/lobby/join-lobby.service'
import { GetLobbyByIdService } from '@services/lobby/get-lobby-by-id.service'

export class LobbyController {
  async create(request: Request, response: Response) {
    const { gameId } = request.body
    const hostId = request.user.id

    const createLobbyService = container.resolve(CreateLobbyService)

    const lobby = await createLobbyService.execute({
      gameId,
      hostId,
    })

    return response.status(201).json(lobby)
  }

  async join(request: Request, response: Response) {
    const { joinCode } = request.body
    const userId = request.user.id

    const joinLobbyService = container.resolve(JoinLobbyService)

    const lobby = await joinLobbyService.execute({
      joinCode,
      userId,
    })

    return response.status(200).json(lobby)
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params

    const getLobbyByIdService = container.resolve(GetLobbyByIdService)

    const lobby = await getLobbyByIdService.execute({ id })

    return response.status(200).json(lobby)
  }
}
