import { Request, Response } from 'express'

export class GameController {
  async create(request: Request, response: Response) {
    response.status(201).json({ message: 'Game created' })
  }
}
