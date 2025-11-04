import { Router } from 'express'

import { userRoutes } from './user.routes'
import { lobbyRoutes } from './lobby.routes'
import { gameRoutes } from './game.routes'
import { matchRoutes } from './match.routes'

export const routes = Router()

routes.use('/user', userRoutes)
routes.use('/lobbie', lobbyRoutes)
routes.use('/game', gameRoutes)
routes.use('/matche', matchRoutes)
