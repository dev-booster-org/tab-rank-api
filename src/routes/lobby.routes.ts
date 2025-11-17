import { Router } from 'express'

import { LobbyController } from '@controllers/lobby.controller'
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensure-authenticated.middleware'

const lobbyController = new LobbyController()

export const lobbyRoutes = Router()

lobbyRoutes.post(
  '/create',
  ensureAuthenticatedMiddleware,
  lobbyController.create,
)

lobbyRoutes.post('/join', ensureAuthenticatedMiddleware, lobbyController.join)

lobbyRoutes.get('/:id', ensureAuthenticatedMiddleware, lobbyController.getById)
