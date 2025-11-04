import { Request, Response } from 'express'

export class MatchController {
  async create(request: Request, response: Response) {
    response.status(201).json({ message: 'Match created' })
  }
}
