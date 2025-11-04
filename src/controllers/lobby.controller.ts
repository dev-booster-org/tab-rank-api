import { Request, Response } from 'express'

export class LobbyController {
  async create(request: Request, response: Response) {
    response.status(201).json({ message: 'Lobby created' })
  }
}
