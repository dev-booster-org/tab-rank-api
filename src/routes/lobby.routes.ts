import { Router } from 'express'

import { LobbyController } from '@controllers/lobby.controller'

const lobbyController = new LobbyController()

export const lobbyRoutes = Router()

lobbyRoutes.post('/', lobbyController.create)
