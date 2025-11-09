import { Router } from 'express'

import { GameController } from '@controllers/game.controller'
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensure-authenticated.middleware'

const gameController = new GameController()

export const gameRoutes = Router()

gameRoutes.post('/create', ensureAuthenticatedMiddleware, gameController.create)
gameRoutes.get('/list', gameController.list)
