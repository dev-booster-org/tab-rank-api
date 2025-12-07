import { Router } from 'express'

import { GameController } from '@controllers/game.controller'
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensure-authenticated.middleware'

const gameController = new GameController()

export const gameRoutes = Router()

gameRoutes.post('/create', ensureAuthenticatedMiddleware, gameController.create)

gameRoutes.get('/list', ensureAuthenticatedMiddleware, gameController.list)

gameRoutes.get(
  '/list-game-rank',
  ensureAuthenticatedMiddleware,
  gameController.listGameRank,
)

gameRoutes.get(
  '/list-game-rank-by-user/:userId',
  ensureAuthenticatedMiddleware,
  gameController.listGameRankByUser,
)
