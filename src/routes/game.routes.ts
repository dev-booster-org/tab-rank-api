import { Router } from 'express'

import { GameController } from '@controllers/game.controller'

const gameController = new GameController()

export const gameRoutes = Router()

gameRoutes.post('/create', gameController.create)
