import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { gameRoutes } from './game.routes'
import { lobbyRoutes } from './lobby.routes'
import { matchRoutes } from './match.routes'
import { userRoutes } from './user.routes'

export const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/game', gameRoutes)
routes.use('/lobby', lobbyRoutes)
routes.use('/match', matchRoutes)
routes.use('/user', userRoutes)
