import { Router } from 'express'

import { LobbyController } from '@controllers/lobby.controller'

const lobbyController = new LobbyController()

export const lobbyRoutes = Router()

lobbyRoutes.post('/create', lobbyController.create)
lobbyRoutes.post('/join', lobbyController.join)
